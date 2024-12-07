<template>
    <div class="container2">
      <div class="container1">
        <h2>Редактирование организации</h2>
        <form @submit.prevent="updateOrganization">
          <div class="container2">
            <label for="id">Код записи: </label>
            <input type="text" id="id" v-model="id" required />
          </div>
          <div class="container2">
            <label for="name">Название: </label>
            <input type="text" id="name" v-model="name" required />
          </div>
          <div class="container2">
            <label for="comment">Комментарий: </label>
            <textarea id="comment" v-model="comment" required></textarea>
          </div>
        </form>
      </div>
      <button type="submit">Сохранить</button>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        id: "",
        name: "",
        comment: "",
        message: "",
      };
    },
    methods: {
      async updateOrganization() {
        try {
          const response = await axios.post(
            "http://localhost:8081/Org/organization/:{this.id}",
            {
              name: this.name,
              comment: this.comment,
            }
          );
          this.message = response.data;
          this.name = "";
          this.comment = "";
        } catch (error) {
          this.message = "Ошибка при добавлении записи";
        }
      },
    },
  };
  </script>
  <style src="../../assets/style.css"></style>
  