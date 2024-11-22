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
        <input class="input" type="text" v-model="inputText" @keyup.enter="sendMessage">
        <button class="send-button" @click="sendMessage">Send</button>
    </div>
</template>

<style>
.input-bar {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}

.input {
    font-size: 1.4rem;
    width: 70%;
    height: 50px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 25px;
    margin-right: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.send-button {
    font-size: 1.3rem;
    height: 50px;
    width: 100px;
    border: none;
    border-radius: 10px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.send-button:hover {
    background-color: #0056b3;
}
</style>