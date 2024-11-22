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
    <div class="chat">
        <div class="messages">
            <div v-for="(message, index) in messages" :key="index" class="message" :class="message.role">
                {{ message.content }}
            </div>
        </div>
        <InputBar @sendMessage="handleSendMessage" />
    </div>
</template>

<style>
.chat {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #1e1e1e;
    color: #ffffff;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}

.messages {
    flex: 1;
    width: 100%;
    overflow-y: auto;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #2e2e2e;
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
}

.message.assistant {
    align-self: flex-start;
    background-color: #4e4e4e;
}

.input-bar {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: #1e1e1e;
    border-top: 1px solid #333;
    position: fixed;
    bottom: 0;
    left: 0;
}

.input {
    font-size: 1.4rem;
    width: 70%;
    height: 40px;
    padding: 10px 15px;
    border: none;
    border-radius: 20px;
    margin-right: 10px;
    background-color: #2e2e2e;
    color: #fff;
    outline: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.input::placeholder {
    color: #aaa;
}

.send-button {
    font-size: 1.3rem;
    height: 40px;
    width: 40px;
    border: none;
    border-radius: 50%;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease;
}

.send-button:hover {
    background-color: #0056b3;
}

.send-button svg {
    fill: white;
}
</style>