<template>
    <div>
      <nav class="bg-gray-800 p-4">
        <div class="container mx-auto flex justify-between items-center">
          <div class="flex items-center">
            <NuxtLink to="/">
              <img src="/assets/logo.png" alt="Logo" class="h-8 mr-2">
            </NuxtLink>
            <span class="text-white text-xl font-semibold">DD Chat App</span>
          </div>
          
          <div class="hidden md:flex space-x-4 items-center">
            <div v-for="item in navItems" :key="item.name">
              <NuxtLink :to="item.link" class="nbtn">
                {{ item.name }}
              </NuxtLink>
            </div>
            <NuxtLink class="cbtn" to="/chat">Chat</NuxtLink>
          </div>

          <button @click="toggleMenu" class="md:hidden text-white focus:outline-none">
            Menu
          </button>
        </div>

        <div v-if="isMenuOpen" class="md:hidden bg-gray-700">
          <div v-for="item in navItems" :key="item.name">
            <NuxtLink :to="item.link" class="block text-white hover:text-gray-300 p-4" @click="closeMenu">
              {{ item.name }}
            </NuxtLink>
          </div>
          <NuxtLink class="block text-white hover:text-gray-300 p-4" to="/chat" @click="closeMenu">Chat</NuxtLink>
        </div>
      </nav>
      <slot />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const navItems = [
    { name: 'Home', link: "/" },
    { name: 'Create User', link: "/createuser" },
  ];
  
  const isMenuOpen = ref(false);
  const router = useRouter();
  
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };
  
  const closeMenu = () => {
    isMenuOpen.value = false;
  };
  
  // close the menu after page change
  router.afterEach(() => {
    closeMenu();
  });
  </script>
  
  <style scoped>
  </style>