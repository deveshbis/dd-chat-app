<template>
    <div>
      <div>
        <h1>Create an User</h1>
      </div>
      <form class="space-y-4 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Enter Username"
          class="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-gray-400 rounded">
        <div>
          <h2 class="text-sm text-black mb-2">Select Role Type</h2>
          <div class="flex items-center">
            <input
              type="radio"
              id="admin"
              name="role"
              value="admin"
              class="w-5 h-8">
            <label for="admin" class="text-sm text-black ml-4">Admin</label>
          </div>
          <div class="flex items-center">
            <input
              type="radio"
              id="user"
              name="role"
              value="user"
              class="w-5 h-8">
            <label for="user" class="text-sm text-black ml-4">User</label>
          </div>
        </div>
        <button class="btn mt-4">Add User</button>
      </form>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  </style>