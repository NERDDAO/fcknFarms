/** @jsxImportSource frog/jsx */
import { parseEther, Button, Frog, TextInput } from 'frog'
import { handle } from 'frog/next'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import { Haikipu, hAIku } from "../middleware/openAi/royCall"
import { inngest } from "../../../inngest/client"; // Import our client

// Opt out of caching; every request should send a new event
export const dynamic = "force-dynamic";

type State = {
    id: string,
    haikipu: Haikipu
}


const app = new Frog<{ State: State }>({
    basePath: '/api',
    initialState: { id: '', haikipu: {} }
})

// Frame to capture user's favorite fruit.
app.frame('/', async (c) => {
    const { deriveState, frameData } = c
    const state = deriveState(previousState => {
        previousState.id = frameData?.messageHash.toString() || ''
    })
    return c.res({
        action: '/landing',
        image: (
            <div style={{
                color: 'white',
                backgroundColor: "black",
                display: 'flex',
                flexDirection: "column",
                fontSize: 60,
                padding: 16,
                alignItems: "center",
                justifyContent: "center",
                left: 0, right: 0, top: 0, bottom: 0, position: "absolute"
            }}>
                Haiku Maker
                <span style={{ fontSize: 20, bottom: 0, right: 0, position: "relative", backgroundColor: "black", color: "white" }}> made by the Nerds</span>
            </div>
        ),
        intents: [
            <Button >Enter</Button>
        ]
    })
})

app.frame('/landing', async (c) => {
    const { deriveState, frameData } = c

    const state = deriveState(previousState => {
        previousState.id = frameData?.messageHash.toString() || ''
    })

    const disp = state.id.substring(0, Math.min(state.id.length, 10))
    return c.res({
        action: '/submit',
        image: (
            <div style={{
                color: 'white',
                backgroundColor: "black",
                display: 'flex',
                flexDirection: "column",
                fontSize: 60,
                padding: 16,
                alignItems: "center",
                justifyContent: "center",
                left: 0, right: 0, top: 0, bottom: 0, position: "absolute"
            }}>
                Write the subject of your haiku
                <br /> <span style={{ fontSize: 30 }}>Id: {disp}</span>
            </div>
        ),
        intents: [
            <TextInput placeholder="Enter a subject" />,
            <Button >Send</Button>
        ]
    })
})

// Frame to display user's response.
app.frame('/submit', async (c) => {
    const { deriveState, frameData, buttonValue, status, inputText } = c;
    const state = deriveState(previousState => {
        previousState
    })

    const disp = state.id.substring(0, Math.min(state.id.length, 10))
    const userPrompt = `Subject: ${inputText}`
    await inngest.send({
        name: "test/hello.world",
        data: {
            id: state.id,
            prompt: userPrompt,
        },
    });
    return c.res({
        image: (
            <div style={{
                color: 'white',
                backgroundColor: "black",
                display: 'flex',
                flexDirection: "column",
                fontSize: 60,
                padding: 16,
                alignItems: "center",
                justifyContent: "center",
                left: 0, right: 0, top: 0, bottom: 0, position: "absolute"
            }}>

                <br /> <span> Haiku Title:</span><br />
                <span> {inputText}</span>

                <br /> <span style={{ fontSize: 30 }}>Id: {disp}</span>
            </div>
        ),
        intents: [
            <Button action="/" >Back</Button>,
            <Button action="/render" >Render</Button>
        ]
    })
})
//render haiku
app.frame('/render', async (c) => {
    const { deriveState, inputText } = c;
    const state = await deriveState(async previousState => {
        const haiku = await fetch(`https://fworks.vercel.app/api/mongo/haiku?id=${previousState.id}`)
        const hk = await haiku.json()
        console.log(hk)
        previousState.haikipu = hk[0] && hk[0].haikipu
    })
    const disp = state.id.substring(0, Math.min(state.id.length, 10))
    return c.res({
        image: (
            <div style={{
                color: 'white',
                backgroundColor: "black",
                display: 'flex',
                flexDirection: "column",
                fontSize: 60,
                padding: 16,
                alignItems: "center",
                justifyContent: "center",
                left: 30, right: 0, top: 0, bottom: 0, position: "absolute"
            }}>


                <br /> <span> Haiku Title:</span><br />
                <span> {state.haikipu?.title}</span>

                <br /> <span style={{ fontSize: 30 }}>Id: {disp}</span>

                <br /> <span> Haiku: {state.haikipu?.haiku || "no haiku, refresh"}</span>
            </div>
        ),
        intents: [
            <Button.Transaction target="/mint" >Mint</Button.Transaction>,

            <Button action="/render" >Refresh</Button>,
            <Button action="/">Back</Button>
        ]
    })
})


//transaction routes
const abi = [
    {
        inputs: [{ internalType: "string", name: "uri", type: "string" }],
        name: "mint",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    },
] as const

app.transaction('/mint', (c) => {
    const { inputText, previousState } = c
    // Contract transaction response.
    return c.contract({
        abi,
        chainId: 'eip155:8453',
        functionName: 'mint',
        args: [previousState.haikipu.haiku],
        to: '0xd02D7C87E9EB71ABCd544D07230849Fc5EdcbD55',
        value: parseEther("0.000071")
    })
})

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
