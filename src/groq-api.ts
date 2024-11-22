import Groq from "groq-sdk";

const client = new Groq({
    apiKey: import.meta.env.VITE_GROQ_KEY,
    dangerouslyAllowBrowser: true,
});

const model = 'llama3-8b-8192';
const system_msg = "You can only provide info about math. If the topic is different, respond: 'Sorry but I can only provide info about math.'. If the user asks for math expression use latex in markdown"

export interface Completion {
    choices: Choice[];
}

interface Choice {
    index: number;
    message: {
        role: string;
        content: string;
    };
    finish_reason: string;
}


export async function sendMsg(msg: string): Promise<Completion> {
    const response = await client.chat.completions.create({
        model: model,
        messages: [
            {
                role: 'system',
                content: system_msg
            },
            {
                role: 'user',
                content: msg
            }
        ]
    });

    return {
        choices: response.choices.map((choice) => {
            return {
                index: choice.index,
                message: choice.message,
                finish_reason: choice.finish_reason
            } as Choice;
        })
    };
}