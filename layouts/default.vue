<template>
    <main>
      <div>
        <Navbar />
      </div>
     <div>
      <slot />
     </div>
    </main>

</template>

<script setup>
    import Navbar from '~/components/Shared/Navbar';
</script>

<style scoped>
</style>