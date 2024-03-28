/** @jsxImportSource frog/jsx */
import { Button, Frog, TextInput } from 'frog'
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
        action: '/submit',
        image: (
            <div style={{ color: 'white', display: 'flex', flexDirection: "column", fontSize: 60 }}>
                Write the subject of your haiku
                <br /> <span>query 1: {state.id}</span>
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
            <div style={{ color: 'white', display: 'flex', flexDirection: "column", fontSize: 60 }}>

                <br /> <span> Title: {inputText}

                    <br /> <span>query 1: {state.id}</span>
                </span>
            </div>
        ),
        intents: [
            <Button action="/" >Back</Button>,
            <Button action="/render" >Render</Button>
        ]
    })
})

app.frame('/render', async (c) => {
    const { deriveState } = c;
    const state = await deriveState(async previousState => {
        const haiku = await fetch(`http://localhost:3000/api/mongo/haiku?id=${previousState.id}`)
        const hk = await haiku.json()
        console.log(hk)
        previousState.haikipu = hk[0] && hk[0].haikipu
    })
    return c.res({
        image: (
            <div style={{ color: 'white', display: 'flex', flexDirection: "column", fontSize: 60 }}>
                <span>query Id: {state.id}</span>
                <br /> <span> Title: {state.haikipu?.haiku || "no haiku"}</span>
            </div>
        ),
        intents: [
            <Button action="/" >Back</Button>,

            <Button action="/render" >Refresh</Button>
        ]
    })
})

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
