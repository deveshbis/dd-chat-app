<template>
    <div>
      <div v-for="message in messages" :key="message.id">
        <div :class="message.user.role === 'Admin' ? 'justify-end' : 'justify-start'">
          <img class="w-8 h-8 rounded-full"
            src="https://i.ibb.co/SQ6939Q/portrait-handsome-smiling-stylish-young-man-model-wearing-jeans-clothes-sunglasses-fashion-man-1.png"
            alt="User Image" />
          <div class="flex flex-col w-full max-w-[320px] leading-1.5">
            <div class="flex items-center space-x-2 rtl:space-x-reverse">
              <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ message.user.name }}</span>
              <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{ new Date(message.id).toLocaleTimeString() }}</span>
            </div>
            <p class="text-sm font-normal py-2 text-gray-900 dark:text-white">{{ message.text }}</p>
          </div>
        </div>
      </div>
      <form @submit.prevent="handleSubmit">
        <label for="chat" class="sr-only">Your message</label>
        <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
          <div class="relative font-[sans-serif] w-max mx-auto">
            <button type="button" @click="toggleDropdown"
              class="px-4 py-2 flex items-center rounded-full text-[#333] text-sm border border-gray-300 outline-none hover:bg-gray-100">
              <img src="https://readymadeui.com/profile_6.webp" class="w-7 h-7 mr-3 rounded-full shrink-0" alt="Profile" />
              {{ selectedRole.name }}
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 fill-gray-400 inline ml-3" viewBox="0 0 24 24">
                <path fill-rule="evenodd"
                  d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                  clip-rule="evenodd" />
              </svg>
            </button>
  
            <ul v-if="isDropdownVisible"
              class="absolute shadow-lg bg-white py-2 z-[1000] min-w-full w-max rounded-lg max-h-96 overflow-auto">
              <li v-for="user in users" :key="user.id" @click="selectRole(user)"
                class="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-4 h-4 mr-3" viewBox="0 0 512 512">
                  <path d="M337.711 241.3a16 16 0 0 0-11.461 3.988c-18.739 16.561-43.688 25.682-70.25 25.682s-51.511-9.121-70.25-25.683a16.007 16.007 0 0 0-11.461-3.988c-78.926 4.274-140.752 63.672-140.752 135.224v107.152C33.537 499.293 46.9 512 63.332 512h385.336c16.429 0 29.8-12.707 29.8-28.325V376.523c-.005-71.552-61.831-130.95-140.757-135.223zM446.463 480H65.537V376.523c0-52.739 45.359-96.888 104.351-102.8C193.75 292.63 224.055 302.97 256 302.97s62.25-10.34 86.112-29.245c58.992 5.91 104.351 50.059 104.351 102.8zM256 234.375a117.188 117.188 0 1 0-117.188-117.187A117.32 117.32 0 0 0 256 234.375zM256 32a85.188 85.188 0 1 1-85.188 85.188A85.284 85.284 0 0 1 256 32z" />
                </svg>
                {{ user.name }}
              </li>
            </ul>
          </div>
  
          <textarea id="chat" rows="1" v-model="message"
            class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your message..."></textarea>
  
          <button type="submit"
            class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
            <svg class="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
              viewBox="0 0 18 20">
              <path
                d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
            <span class="sr-only">Send message</span>
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { showToast } from '@/composables/toast';
  
  const isDropdownVisible = ref(false);
  const selectedRole = ref({ name: "Select a User", role: null });
  const users = ref([]);
  const messages = ref([]);
  const message = ref('');
  
  onMounted(() => {
    if (typeof window !== 'undefined') {
      users.value = JSON.parse(localStorage.getItem('users')) || [];
      messages.value = JSON.parse(localStorage.getItem('messages')) || [];
    }
  });
  
  const toggleDropdown = () => {
    isDropdownVisible.value = !isDropdownVisible.value;
  };
  
  const selectRole = (user) => {
    selectedRole.value = user;
    isDropdownVisible.value = false;
  };
  
  const handleSubmit = () => {
    if (!selectedRole.value.role) {
      showToast('Please select a user', 'error');
      return;
    }
  
    if (message.value.trim() === '') {
      showToast('Message cannot be empty', 'error');
      return;
    }
  
    const newMessage = {
      id: Date.now(),
      user: selectedRole.value,
      text: message.value,
    };
  
    messages.value.push(newMessage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('messages', JSON.stringify(messages.value));
    }
    message.value = '';
    showToast('Message sent successfully!', 'success');
  };
  </script>
  