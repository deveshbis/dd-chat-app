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
          class="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200">
          Add User
        </button>
      </form>
      <div class="mt-6">
        <h2 class="text-lg font-semibold text-gray-700">User List</h2>
        <ul class="space-y-2">
          <li v-for="user in users" :key="user.id" class="flex justify-between items-center border-b py-2">
            <span class="text-gray-800">{{ user.name }} ({{ user.role }})</span>
            <button @click="removeUser(user.id)" class="text-red-500 hover:text-red-700">Delete</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { showToast } from '@/composables/toast';

const username = ref('');
const role = ref('user'); //by default selected user
const users = ref([]);

// Show users from local storage
const getUsers = () => {
  const usersData = localStorage.getItem('users');
  return usersData ? JSON.parse(usersData) : [];
};

// Save users to local storage
const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

// Add a user 
const addUser = () => {
  if (!username.value || !role.value) {
    showToast('error', 'Username and role are required');
    return;
  }

  // Checkinhg for duplicate admin
  const currentUsers = getUsers();
  const adminExists = currentUsers.some(user => user.role === 'admin');

  if (role.value === 'admin' && adminExists) {
    showToast('error', 'Admin already exists');
    return;
  }

  const newUser = {
    id: Date.now(), // unique ID (according to date & time)
    name: username.value,
    role: role.value,
  };

  currentUsers.push(newUser); 
  saveUsers(currentUsers);
  users.value = currentUsers; 

  showToast('success', 'User Added');

  username.value = '';
  role.value = '';
};

// Remove a user
const removeUser = (id) => {
  const currentUsers = getUsers();
  const updatedUsers = currentUsers.filter(user => user.id !== id);
  saveUsers(updatedUsers); 
  users.value = updatedUsers;
};

// Load users from local storage
onMounted(() => {
  users.value = getUsers();
});
</script>

<style scoped>
</style>