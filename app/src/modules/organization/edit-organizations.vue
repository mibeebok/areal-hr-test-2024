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
      <input v-model="id" type="text" placeholder="Введите ID записи" />
      <button @click="fetchOrganization">Загрузить данные</button>
      <button type="submit">Сохранить</button>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  <script>
  import axiosInstance from '../../services/axiosInstance';
  
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
      async fetchOrganization() {
        try{
          const response = await axiosInstance.get(`Org/organization/:${this.id}`);
          this.name = response.data.name;
          this.comment = response.data.comment;
          this.message = '';
        }catch (error){
          this.message = `Ошибка при загрузке данных: ${error.response ? error.response.data.error : error.message}`;
        }
      },
      async updateOrganization() {
        try {
          const response = await axiosInstance.post(
            `Org/organization/:${this.id}`,
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
  