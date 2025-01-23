import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    selectedRole: { name: "Select a User", role: null },
  }),
  actions: {
    setUsers(users) {
      this.users = users;
      if (import.meta.client) { 
        localStorage.setItem('users', JSON.stringify(users));
      }
    },
    selectRole(user) {
      this.selectedRole = user;
    },
    clearRole() {
      this.selectedRole = { name: "Select a User", role: null };
    },
    loadUsersFromLocalStorage() {
      if (import.meta.client) { 
        const storedUsers = JSON.parse(localStorage.getItem('users'));
        if (storedUsers) {
          this.users = storedUsers;
        }
      }
    },
  },
});