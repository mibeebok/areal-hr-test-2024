<template>
  <div class="container2">
    <div class="container1">
      <h2>Добавить новую должность</h2>
      <form @submit.prevent="CreatePositions">
        <div class="container2">
          <label for="name">Название: </label>
          <input type="text" id="name" v-model="name" required />
        </div>
      </form>
    </div>
    <button type="submit">Сохранить</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>
<script>
import axiosInstance from '../../services/axiosInstance';

export default {
  data() {
    return {
      name: "",
      message: "",
    };
  },
  methods: {
    async CreatePositions() {
      try {
        const response = await axiosInstance.post(
          `${process.env.VUE_APP_SERVER_URL}Pos/position`,
          {
            name: this.name,
          }
        );
        this.message = response.dara;
        this.name = "";
      } catch (error) {
        this.message = "Error create new position";
      }
    },
  },
};
</script>
<style src="../../assets/style.css"></style>
