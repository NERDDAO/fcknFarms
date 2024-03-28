/** @jsxImportSource frog/jsx */
import { Button, Frog, TextInput } from 'frog'
import { handle } from 'frog/next'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import { Haikipu, hAIku } from "../middleware/openAi/royCall"

type State = {
    id: string,
    haikipu: Haikipu
}
const aiMiddleWare = async (c: any, next: any) => {


    await next()
    console.log(c)
    const { inputText, frameData, deriveState } = c;

    const userPrompt = `"subject: ${inputText}"`

    const haikipu: Haikipu = {
        title: inputText || '',
        id: frameData?.messageHash.toString() || '',
        address: frameData?.address || '',
        timestamp: Date.now().toString(),
        type: "frame",
        contextSummary: "You write haikus and weave them coherently",
        haiku: "",
        explainer: "",
    };

    await hAIku(haikipu, systemPrompt, assistantPrompt, userPrompt)
}

const app = new Frog<{ State: State }>({
    basePath: '/api',
    initialState: { id: '', haikipu: {} }
})

const systemPrompt = "Write a haiku about a the subject respond in a JSON format with the following structure: {haiku: string, haikuExplainer:string}"

const assistantPrompt = "Haiku, unrhymed poetic form consisting of 17 syllables arranged in three lines of 5, 7, and 5 syllables respectively"

// Frame to capture user's favorite fruit.
app.frame('/', (c) => {
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
app.frame('/submit', aiMiddleWare, (c) => {
    const { deriveState, frameData, buttonValue, status, inputText } = c;

    const userPrompt = `Subject: ${inputText}`
    const state = deriveState(previousState => {
        previousState
    })

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
