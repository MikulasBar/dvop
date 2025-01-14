import Groq from "groq-sdk";

const client = new Groq({
    apiKey: import.meta.env.VITE_GROQ_KEY,
    dangerouslyAllowBrowser: true,
});

const model = 'llama3-8b-8192';
const system_msg = "You can only provide info about math. If the topic is different, respond: 'Sorry but I can only provide info about math.'. Only use markdown and latex."

export interface Completion {
    choices: Choice[];
}

interface Choice {
    index: number;
    finish_reason: string;
    message: Message;
}

export interface Message {
    role: string;
    content: string;
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