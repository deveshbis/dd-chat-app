import { defineStore } from 'pinia';

export const useMessageStore = defineStore('message', {
  state: () => ({
    messages: [],
  }),
  actions: {
    addMessage(message) {
      this.messages.push(message);
      if (import.meta.client) { 
        localStorage.setItem('messages', JSON.stringify(this.messages));
      }
    },
    clearMessages() {
      this.messages = [];
      if (import.meta.client) { 
        localStorage.removeItem('messages');
      }
    },
    loadMessagesFromLocalStorage() {
      if (import.meta.client) { 
        const storedMessages = JSON.parse(localStorage.getItem('messages'));
        if (storedMessages) {
          this.messages = storedMessages;
        }
      }
    },
  },
});