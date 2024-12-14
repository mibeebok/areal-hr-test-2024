<template>
    <div class="container2">
      <div class="container1">
        <h2>Редактировать должность</h2>
        <form @submit.prevent="updatePositions">
          <div class="container2">
            <label for="id">Код записи: </label>
            <input type="text" id="id" v-model="id" required />
          </div>
          <div class="container2">
            <label for="name">Название: </label>
            <input type="text" id="name" v-model="name" required />
          </div>
        </form>
      </div>
      <input v-model="id" type="text" placeholder="Введите ID записи" />
      <button @click="fetchPosition">Загрузить данные</button>
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
        message: "",
      };
    },
    methods: {
      async fetchPosition () {
        try{
          const response = await axiosInstance.get(`Pos/position/:${this.id}`);
          this.name = response.data.name;
          this.message ='';
        } catch (error){
          this.message = `Ошибка при загрузке данных: ${error.response ? error.response.data.error : error.message}`;
        }
      },
      async updatePositions() {
        try {
          const response = await axiosInstance.post(
            `Pos/position/:${this.id}`,
            {
              name: this.name,
            }
          );
          this.message = response.dara;
          this.name = "";
        } catch (error) {
          this.message = "Error update position: ", error;
        }
      },
    },
  };
  </script>
  <style src="../../assets/style.css"></style>
  