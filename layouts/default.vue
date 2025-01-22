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

                <div class="space-x-4">
                    <NuxtLink to="/" class="nbtn">Home</NuxtLink>
                    <NuxtLink to="/createUser" class="nbtn">Create User</NuxtLink>
                    <NuxtLink to="/chat" class="cbtn">Chat</NuxtLink>
                    
                </div>
            </div>
        </nav>
        <slot />
    </div>
</template>


<script setup>

</script>

<style scoped>
    
</style>
