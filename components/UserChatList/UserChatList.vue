<template>
    <div>
      <div v-for="message in messages" :key="message.id" class="flex items-start gap-2.5">
        <img class="w-8 h-8 rounded-full" src="https://i.ibb.co/SQ6939Q/portrait-handsome-smiling-stylish-young-man-model-wearing-jeans-clothes-sunglasses-fashion-man-1.png" alt="User Image">
        <div class="flex flex-col w-full max-w-[320px] leading-1.5">
          <div class="flex items-center space-x-2 rtl:space-x-reverse">
            <span class="text-sm font-semibold text-gray-900 dark:text-white">Bonnie Green</span>
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
          </div>
          <p class="text-sm font-normal py-2 text-gray-900 dark:text-white">{{ message.text }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  const messages = ref([]);
  
  onMounted(() => {
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.value = storedMessages;
  });
  </script>
  
  <style>
  </style>
  