<template>
    <div class="flex flex-col h-full">
        <!-- Messages Container -->
        <div ref="messagesContainer" class="flex-grow max-h-[500px] overflow-y-auto mb-4">
            <div v-for="message in messageStore.messages" :key="message.id"
                :class="message.user.role === 'admin' ? 'justify-end' : 'justify-start'"
                class="flex items-start gap-2.5 mb-2 border border-s-violet-300 p-3 rounded-2xl border-gray-200">
                <div class="flex gap-4">
                    <div :style="{ backgroundColor: getUserColor(message.user.id) }"
                        class="w-12 h-9 rounded-full flex items-center justify-center text-white font-semibold">
                        {{ message.user.name.split('').slice(0, 2).join('').toUpperCase() }}
                    </div>

                    <div class="flex flex-col w-full max-w-[320px] leading-1.5">
                        <div class="flex items-center space-x-2 rtl:space-x-reverse">
                            <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ message.user.name
                                }}</span>
                            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{ new
                                Date(message.id).toLocaleTimeString() }}</span>
                        </div>
                        <p v-if="message.text" class="text-sm font-normal py-2 text-gray-900 dark:text-white">
                            {{ message.text }}
                        </p>
                        <img v-if="message.image" :src="message.image" alt="Uploaded Image"
                            class="max-w-full max-h-[200px] rounded-lg" />
                    </div>
                </div>
            </div>
        </div>


        <!-- Input Form -->
        <form @submit.prevent="handleSubmit"
            class="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">

            <button type="button" @click="openModal"
                class="px-4 py-2 flex items-center rounded-full text-[#333] text-sm border border-gray-300 outline-none hover:bg-gray-100">
                <img src="https://readymadeui.com/profile_6.webp" class="w-7 h-7 mr-3 rounded-full shrink-0"
                    alt="Profile" />
                {{ userStore.selectedRole.name }}
            </button>

            <!-- Upload Image Component -->
            <div class="flex items-center space-x-3">
                <input type="file" @change="handleFileUpload" accept="image/*" class="hidden " ref="imageInput" />
                <button type="button" @click="triggerImageUpload"
                    class="px-4 py-2 flex items-center gap-2 rounded-lg bg-blue-500 text-white text-sm shadow-md hover:bg-blue-600">
                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Upload Image
                </button>
                <span v-if="uploadedImageName" class="text-sm text-gray-700 font-medium truncate max-w-[200px]"
                    title="Uploaded File">
                    {{ uploadedImageName }}
                </span>
            </div>

            <!-- Message Input -->
            <textarea id="chat" rows="2" v-model="message" @keydown.enter.prevent="handleSubmit"
                class="flex-grow block p-2.5 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your message..."></textarea>

            <!-- Send Button -->
            <button type="submit"
                class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                <svg class="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor" viewBox="0 0 18 20">
                    <path
                        d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                </svg>
                <span class="sr-only">Send message</span>
            </button>
        </form>

        <!-- User Selection Modal -->
        <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white rounded-lg shadow-lg p-6 w-80">
                <h2 class="text-lg font-semibold mb-4">Select a User</h2>
                <ul class="max-h-60 overflow-y-auto">
                    <li v-for="user in userStore.users" :key="user.id" @click="selectRole(user)"
                        class="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
                        {{ user.name }}
                    </li>
                </ul>
                <div class="flex justify-center mt-4">
                    <button @click="closeModal" class="px-4 py-2 bg-blue-500 text-white rounded-lg">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { showToast } from '@/composables/toast';
import { useUserStore } from '@/stores/userStore';
import { useMessageStore } from '@/stores/messageStore';

const userStore = useUserStore();
const messageStore = useMessageStore();

const isModalOpen = ref(false);
const message = ref('');
const messagesContainer = ref(null);

onMounted(() => {
    userStore.loadUsersFromLocalStorage();
    messageStore.loadMessagesFromLocalStorage();
    nextTick(() => scrollToBottom());
});

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const selectRole = (user) => {
    userStore.selectRole(user);
    closeModal();
};

const handleSubmit = () => {
    if (!userStore.selectedRole.role && message.value.trim() === '' && !messageStore.tempImage) {
        showToast('error', 'Select a Role and Type a Message or Upload an Image');
        return;
    }

    if (!userStore.selectedRole.role) {
        showToast('error', 'Please select a role');
        return;
    }

    if (message.value.trim() === '' && !messageStore.tempImage) {
        showToast('error', `Message or image can't be empty`);
        return;
    }

    const newMessage = {
        id: Date.now(),
        user: userStore.selectedRole,
        text: message.value.trim(),
        image: messageStore.tempImage || null,
    };

    messageStore.addMessage(newMessage);
    message.value = '';
    messageStore.tempImage = null;
    nextTick(() => scrollToBottom());
};

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            messageStore.tempImage = reader.result;
            showToast('success', 'Image uploaded! Now press Send to send it.');
        };
        reader.readAsDataURL(file);
    }
};

const triggerImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', handleImageUpload);
    input.click();
};

const scrollToBottom = () => {
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
};


const userColors = ref(new Map());

const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const getUserColor = (userId) => {
    if (!userColors.value.has(userId)) {
        userColors.value.set(userId, generateRandomColor());
    }
    return userColors.value.get(userId);
};
</script>

<style scoped></style>