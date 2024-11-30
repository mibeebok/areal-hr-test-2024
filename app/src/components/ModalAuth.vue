<template>
    <div id="modal">
      <div id="modal-content">
        <h2>Авторизация</h2>
        <form @submit.prevent="login">
          <input type="text" v-model="username" placeholder="Логин" required /><br /><br />
          <input type="password" v-model="password" placeholder="Пароль" required /><br /><br />
          <button type="submit">Войти</button>
        </form>
        <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ModalAuth',
    data() {
      return {
        username: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
      login() {
        // Пример авторизации, чтобы была возможность проверки сайта (потом изменю на данные с бд)
        if (this.username === 'user' && this.password === 'password') {
          this.$emit('authenticated'); 
        } else {
          this.errorMessage = 'Неверный логин или пароль';
        }
      }
    }
  };
  </script>
  
  <style src="../assets/style.css">
  </style>
  