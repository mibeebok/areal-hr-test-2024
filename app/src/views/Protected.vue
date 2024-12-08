<template>
    <div>
      <h1>Protected Content</h1>
      <p>This content is protected and requires authentication.</p>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
  import AuthService from '../services/authService';
  
  export default {
    methods: {
      logout() {
        AuthService.logout();
        this.$router.push('/login');
      },
    },
  };
  </script>
<style src="../assets/style.css"></style>  