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
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:8081/Avt/login', {
          login: this.login,
          password: this.password
        });
        console.log(response.data.message);
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = 'Ошибка сети. Попробуйте позже.';
        }
      }
    }
  }
  };
  </script>
  
  <style src="../assets/style.css">
  </style>
  