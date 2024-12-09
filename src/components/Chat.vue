<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';
import InputBar from './Inputbar.vue';
import { sendMsg, Message } from '../groq-api';
import { renderMdHtml } from '../md-latex';


const messages = ref<Message[]>([]);
const lastMsgRef = ref<HTMLElement | null>(null);

async function handleSendMessage(msg: string) {
    messages.value.push({
        role: 'user',
        content: msg
    });

    const completion = await sendMsg(msg);
    const response_msg = completion.choices[0].message;
    
    messages.value.push(response_msg);
}

watchEffect(() => {
    console.log(`messages updated ${lastMsgRef.value}`);
    if (lastMsgRef.value !== null && lastMsgRef.value !== undefined) {
        console.log('scrolling to last message');
        lastMsgRef.value!.scrollIntoView();
    }
});
</script>

<template>
    <div class="chat-container">
        <div class="messages">
            <div 
                v-for="(message, index) in messages"
                :key="index"
                class="message"
                :class="message.role"
                v-html="renderMdHtml(message.content)"
                :ref="index == messages.length - 1 ? 'lastMsgRef' : undefined">
            </div>
        </div>
        <InputBar @sendMessage="handleSendMessage" />
    </div>
</template>

<style>
.chat-container {
    padding-top: 70px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #1e1e1e;
    color: #ffffff;
    padding-bottom: 70px; /* Space for the input bar */
}

.messages {
    flex: 1;
    width: 100%;
    overflow-y: auto;
    padding: 10px;
    gap: 10px;
    overflow: auto;
    padding-bottom: 10%;
}

.message {
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #3e3e3e;
    color: #ffffff;
    word-wrap: break-word;
    max-width: 70%;
    font-size: 1.4rem;
}

.message.user {
    align-self: flex-end;
    background-color: #007bff;
    color: white;
    margin-left: auto;
    width: fit-content;
    text-align: right;
}

.message.assistant {
    align-self: flex-start;
    background-color: #4e4e4e;
    margin-right: auto;
}
</style>