<template>
    <form @submit.prevent="updateUser">
      <div class="container2">
        <div class="container1">
          <h2>Редактировать пользователя</h2>
          <div class="container2">
            <label for="login">Логин: </label>
            <input
              type="text"
              v-model="login"
              placeholder="Имя пользователя"
              required
            />
          </div>
          <div class="container2">
            <label for="password">Пароль: </label>
            <input
              type="password"
              v-model="password"
              placeholder="Пароль"
              required
            />
          </div>
          <div class="container2">
            <label for="firstname">Фамилия: </label>
            <input
              type="text"
              v-model="firstname"
              placeholder="Фамилия"
              required
            />
          </div>
          <div class="container2">
            <label for="name">Имя: </label>
            <input
              type="text"
              v-model="name"
              placeholder="Имя"
              required
            />
          </div>
          <div class="container2">
            <label for="patronymic">Отчество: </label>
            <input
              type="text"
              v-model="patronymic"
              placeholder="Отчество"
              required
            />
          </div>
          <div class="container2">
            <label for="roles">Роль: </label>
            <input
              type="text"
              v-model="roles"
              placeholder="Роль"
            />
          </div>
          <button type="submit">Создать</button>
          <button type="button" @click="$emit('close')">Закрыть</button>
        </div>
      </div>
    </form>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
          login: "",
          password: "",
          firstname: "",
          name:"",
          patronymic:"",
          roles:"",
          message:""
      };
    },
    methods: {
      async updateUser() {
          try{
               await axios.post("http://localhost:8081/User/specialist/{this.id}",
                  {
                      login: this.login,
                      password: this.password,
                      firstname: this.firstname,
                      name: this.name,
                      patronymic: this.patronymic,
                      roles: this.roles,
                  }
              );
              this.message = "";
              this.login ="";
              this.password="";
              this.firstname="";
              this.name="";
              this.patronymic="";
              this.roles="";
          } catch(error){
              this.message = "Ошибка при редактировании: ", error;
          }
      },
    },
  };
  </script>
  
  <style src="../assets/style.css"></style>
  