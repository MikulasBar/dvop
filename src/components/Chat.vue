<script setup lang="ts">
import { ref } from 'vue';
import InputBar from './InputBar.vue';
import { sendMsg, Message } from '../groq-api';

const messages = ref<Message[]>([]);

async function handleSendMessage(msg: string) {
    messages.value.push({
        role: 'user',
        content: msg
    });

    const completion = await sendMsg(msg);
    const response_msg = completion.choices[0].message;
    
    messages.value.push(response_msg);
}
</script>

<template>
    <div class="chat-container">
        <div class="messages">
            <div v-for="(message, index) in messages" :key="index" class="message" :class="message.role">
                {{ message.content }}
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