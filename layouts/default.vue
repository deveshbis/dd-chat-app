<template>
  <main class="flex flex-col min-h-screen">
      <div>
          <Navbar />
      </div>
      <div class="flex-grow">
          <slot />
      </div>
      <Footer />
  </main>
</template>

<script setup>
import Navbar from '~/components/Shared/Navbar';
import Footer from '~/components/Shared/Footer';
</script>

<style scoped>
/* Optional: Add styles if needed */
</style>