<template>
    <div>
        <input type="file" @change="handleFileUpload" accept="image/*" />
    </div>
</template>

<script setup>
import { defineEmits } from 'vue';

// Emit event for the uploaded file
const emit = defineEmits(['file-uploaded']);

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            emit('file-uploaded', reader.result); // Pass the image as Base64 URL
        };
        reader.readAsDataURL(file); // Convert file to Base64
    }
};
</script>





<!-- <template>
    <div>
        <input type="file"
            class="w-full text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded" />
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style> -->