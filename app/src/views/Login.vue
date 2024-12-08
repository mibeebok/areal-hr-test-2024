<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input v-model="loginData.login" placeholder="Login" required />
        <input v-model="loginData.password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import AuthService from '../services/authService';
  
  export default {
    data() {
      return {
        loginData: {
          login: '',
          password: '',
        },
      };
    },
    methods: {
      async login() {
        try {
          await AuthService.login(this.loginData);
          this.$router.push('/protected'); // Перенаправление на защищенный маршрут после успешного входа
        } catch (error) {
          console.error('Login failed:', error);
          alert('Invalid login credentials');
        }
      },
    },
  };
  </script>
  <style src="../assets/style.css"></style>