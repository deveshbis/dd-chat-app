<template>
<div>
    <nav class="bg-gray-800 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center">
          <img src="/assets/logo.png" alt="Logo" class="h-8 mr-2" />
          <span class="text-white text-xl font-semibold">DD Chat App</span>
        </div>

        <div class="space-x-4">
          <NuxtLink to="/" class="text-white hover:underline">Home</NuxtLink>
          <NuxtLink to="/createUser" class="text-white hover:underline">Create User</NuxtLink>
          <NuxtLink to="/chat" class="text-white hover:underline">Chat</NuxtLink>
        </div>
      </div>
    </nav>
    <slot />
</div>
  </template>
  
  <script>

  </script>
  
  <style scoped>
  </style>