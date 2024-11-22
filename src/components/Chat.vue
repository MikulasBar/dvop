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
    background-color: #000118;
    color: #ffffff;
}
.messages {
    flex: 1;
    width: 100%;
    overflow-y: auto;
}
.message {
    padding: 10px;
    border-bottom: 1px solid #ccc;
}
.message.user {
    text-align: right;
}
.message.assistant {
    text-align: left;
}
</style>