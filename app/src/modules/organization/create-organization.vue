<template>
  <div class="container2">
    <div class="container1">
      <h2>Добавление новой организации</h2>
      <form @submit.prevent="createOrganization">
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
import axiosInstance from '../../services/axiosInstance';

export default {
  data() {
    return {
      name: "",
      comment: "",
      message: "",
    };
  },
  methods: {
    async createOrganization() {
      try {
        const response = await axiosInstance.post(
          `Org/organization`,
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
