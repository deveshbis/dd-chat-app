<template>
  <div class="flex flex-col items-center justify-center mt-20">
    <div class="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
      <h1 class="text-2xl font-bold text-center mb-4 text-gray-700">Create a User</h1>
      <form @submit.prevent="addUser" class="space-y-6">
        <input
          type="text"
          v-model="username"
          placeholder="Enter Username"
          class="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-gray-400 rounded transition duration-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
        <div>
          <h2 class="text-sm text-gray-600 mb-2">Select Role Type</h2>
          <div class="flex items-center mb-2">
            <input
              type="radio"
              id="admin"
              name="role"
              value="admin"
              v-model="role"
              class="w-5 h-5 text-blue-600 border-gray-300 focus:ring focus:ring-blue-200"
            />
            <label for="admin" class="text-sm text-gray-700 ml-2">Admin</label>
          </div>
          <div class="flex items-center">
            <input
              type="radio"
              id="user"
              name="role"
              value="user"
              v-model="role"
              class="w-5 h-5 text-blue-600 border-gray-300 focus:ring focus:ring-blue-200"
            />
            <label for="user" class="text-sm text-gray-700 ml-2">User</label>
          </div>
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add User
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { showToast } from '@/composables/toast';

const username = ref('');
const role = ref('');

const addUser = () => {
  if (!username.value && !role.value) {
    showToast('error', 'Username and role are required');
    return;
  }

  if (!username.value) {
    showToast('error', 'Username is required');
    return;
  }
  if (!role.value) {
    showToast('error', 'Please select a role type');
    return;
  }

  showToast('success', 'User Added');

  username.value = '';
  role.value = '';
};
</script>

<style scoped>
</style>