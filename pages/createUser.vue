<template>
  <div>
    <div>
      <h1>Create an User</h1>
    </div>
    <form @submit.prevent="addUser" class="space-y-4 max-w-md mx-auto">
      <input
        type="text"
        v-model="username"
        placeholder="Enter Username"
        class="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-gray-400 rounded"
      />
      <div>
        <h2 class="text-sm text-black mb-2">Select Role Type</h2>
        <div class="flex items-center">
          <input
            type="radio"
            id="admin"
            name="role"
            value="admin"
            v-model="role"
            class="w-5 h-8"
          />
          <label for="admin" class="text-sm text-black ml-4">Admin</label>
        </div>
        <div class="flex items-center">
          <input
            type="radio"
            id="user"
            name="role"
            value="user"
            v-model="role"
            class="w-5 h-8"
          />
          <label for="user" class="text-sm text-black ml-4">User</label>
        </div>
      </div>
      <button type="submit" class="btn mt-4">Add User</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { showToast } from '@/composables/toast';

const username = ref('');
const role = ref('');

const addUser = () => {
  if (!username.value && !role.value){
    showToast('error', 'Username and role is required')
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