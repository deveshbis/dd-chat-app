import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {

  const users = ref([]);
  const selectedRole = ref({ name: "Select a User", role: null });

  const setUsers = (userList) => {
    users.value = userList;
    if (import.meta.client) {
      localStorage.setItem('users', JSON.stringify(userList));
    }
  };

  const selectRole = (user) => {
    selectedRole.value = user;
  };

  const clearRole = () => {
    selectedRole.value = { name: "Select a User", role: null };
  };

  const loadUsersFromLocalStorage = () => {
    if (import.meta.client) {
      const storedUsers = JSON.parse(localStorage.getItem('users'));
      if (storedUsers) {
        users.value = storedUsers;
      }
    }
  };

  return {
    users,
    selectedRole,
    setUsers,
    selectRole,
    clearRole,
    loadUsersFromLocalStorage,
  };
});