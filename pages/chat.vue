<template>
    <div class="max-w-5xl mx-auto border-solid border-2 mt-2 rounded-3xl p-3">
        <div class="flex justify-between items-end ">
            <div>
                <UserChatList />
            </div>
            <div>
                <MyChat />
            </div>
            
        </div>
        <div>
            <ChatBox />
        </div>
    </div>

</template>

<script setup>


</script>

<style scoped></style>





<!-- <template>
    <div class="max-w-5xl mx-auto border-solid border-2 mt-2 rounded-3xl p-3">
        <div class="flex justify-between items-end">
            <div>
                <template v-for="(chat, index) in chats" :key="index">
                    <UserChatList v-if="!chat.isMyChat" />
                    <MyChat v-else />
                </template>
            </div>
        </div>
        <div>
            <ChatBox />
        </div>
    </div>
</template>

<script setup>
const chats = [
    { isMyChat: false },
    { isMyChat: false },
    { isMyChat: true },
    { isMyChat: false },
    { isMyChat: true },
    { isMyChat: false },
];
</script>

<style scoped></style> -->