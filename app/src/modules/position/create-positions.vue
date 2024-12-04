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
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      create_at: new Date(),
      message: "",
    };
  },
  methods: {
    async CreatePositions() {
      try {
        const response = await axios.post(
          "http://localhost:8081/Pos/position",
          {
            name: this.name,
            create_at: new Date(),
          }
        );
        this.message = response.dara;
        this.name = "";
        this.create_at = new Date();
      } catch (error) {
        this.message = "Error create new position";
      }
    },
  },
};
</script>
<style src="../../assets/style.css"></style>
