import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMessageStore = defineStore('message', () => {

  const messages = ref([]);

  const addMessage = (message) => {
    messages.value.push(message);
    if (import.meta.client) {
      localStorage.setItem('messages', JSON.stringify(messages.value));
    }
  };

  const clearMessages = () => {
    messages.value = [];
    if (import.meta.client) {
      localStorage.removeItem('messages');
    }
  };

  const loadMessagesFromLocalStorage = () => {
    if (import.meta.client) {
      const storedMessages = JSON.parse(localStorage.getItem('messages'));
      if (storedMessages) {
        messages.value = storedMessages;
      }
    }
  };

  return {
    messages,
    addMessage,
    clearMessages,
    loadMessagesFromLocalStorage,
  };
});