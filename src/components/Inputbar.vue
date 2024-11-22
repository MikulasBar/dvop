<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['sendMessage']);
const inputText = ref('');

function sendMessage() {
    if (inputText.value.trim() === '') return;

    emit('sendMessage', inputText.value);
    inputText.value = '';
}
</script>

<template>
    <div class="input-bar">
        <input class="input" type="text" v-model="inputText" @keyup.enter="sendMessage" placeholder="Type your message...">
        <button class="send-button" @click="sendMessage">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
            </svg>
        </button>
    </div>
</template>

<style>
.input-bar {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: #1e1e1e;
    border-top: 1px solid #333;
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