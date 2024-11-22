<script setup lang="ts">
import { sendMsg } from './groq-api';

const msg = 'What is Taylor series?';
const completion = await sendMsg(msg);

console.log(completion);
</script>

<template>
  <p>Place holder</p>
</template>

<style scoped>

</style>
