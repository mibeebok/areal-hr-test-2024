<template>
  <div id="modal">
    <div id="modal-content">
      <h2 class="title2">Авторизация</h2>
      <form @submit.prevent="handleLogin">
        <input type="text" v-model="username" placeholder="логин" required /><br /><br />
        <input type="password" v-model="password" placeholder="пароль" required /><br /><br />
        <button type="submit">Войти</button>
        <button type="button" @click="$emit('close')">Закрыть</button>
      </form>
      <div class="parent-container">
        <div class="button">
          <button @click="setActiveComponent('modalCreateUser')">Регистрация</button>
        </div>
      </div>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      <div class="parent-container">
      <component :is="activeComponent"></component>
    </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '../services/axiosInstance';
import createUser from './ModalCreateUser.vue';

export default {
  name: 'ModalAuth',
  components: {
    createUser,
  },
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      activeComponent: null, 
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axiosInstance.post(`Avt/login`, {
          login: this.username,
          password: this.password,
        });
        console.log(response.data.message);
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = 'Ошибка сети. Попробуйте позже.';
        }
      }
    },
    setActiveComponent(component) {
      switch (component) {
        case "modalCreateUser":
          this.activeComponent = createUser;
          break;
        default:
          this.activeComponent = null;
      }
    },
  },
};
</script>

<style src="../assets/style.css"></style>