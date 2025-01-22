<template>
    <div class="p-4">
        <div class="max-h-[500px] overflow-y-auto mb-4">
            <div v-for="message in messages" :key="message.id"
                :class="message.user.role === 'admin' ? 'justify-end' : 'justify-start'"
                class="flex items-start gap-2.5 mb-2 border border-s-violet-300 p-3 rounded-2xl border-gray-200">
                <div class="flex gap-4">
                    <div class="w-12 h-9 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold">
                        {{ message.user.name.split('').slice(0, 2).join('').toUpperCase() }}
                    </div>
                    <div class="flex flex-col w-full max-w-[320px] leading-1.5">
                        <div class="flex items-center space-x-2 rtl:space-x-reverse">
                            <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ message.user.name }}</span>
                            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{ new Date(message.id).toLocaleTimeString() }}</span>
                        </div>
                        <p class="text-sm font-normal py-2 text-gray-900 dark:text-white">{{ message.text }}</p>
                    </div>
                </div>
            </div>
        </div>

        <form @submit.prevent="handleSubmit">
            <label for="chat" class="sr-only">Your message</label>
            <div class="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">
                <button type="button" @click="openModal"
                    class="px-4 py-2 flex items-center rounded-full text-[#333] text-sm border border-gray-300 outline-none hover:bg-gray-100">
                    <img src="https://readymadeui.com/profile_6.webp" class="w-7 h-7 mr-3 rounded-full shrink-0" alt="Profile" />
                    {{ selectedRole.name }}
                </button>

                <textarea id="chat" rows="1" v-model="message"
                    class="flex-grow block p-2.5 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your message..."></textarea>

                <button type="submit"
                    class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                    <svg class="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 18 20">
                        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                    </svg>
                    <span class="sr-only">Send message</span>
                </button>
            </div>
        </form>
        <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white rounded-lg shadow-lg p-6 w-80">
                <h2 class="text-lg font-semibold mb-4">Select a User</h2>
                <ul class="max-h-60 overflow-y-auto">
                    <li v-for="user in users" :key="user.id" @click="selectRole(user)"
                        class="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
                        {{ user.name }}
                    </li>
                </ul>
                <button @click="closeModal" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Close</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { showToast } from '@/composables/toast';

const isModalOpen = ref(false);
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

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const selectRole = (user) => {
    selectedRole.value = user;
    closeModal();
};

const handleSubmit = () => {
    if (!selectedRole.value.role && message.value.trim() === '') {
        showToast('error', 'Select a Role and Type a Message');
        return;
    }

    if (!selectedRole.value.role) {
        showToast('error', 'Please select a role');
        return;
    }

    if (message.value.trim() === '') {
        showToast('error', `Message can't be empty`);
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
};
</script>

<style scoped>
</style>