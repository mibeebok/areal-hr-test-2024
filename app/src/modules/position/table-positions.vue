<template>
  <div class="container2">
    <p class="title2">Должности</p>
    <div class="parent-container">
      <table>
        <thead>
          <tr>
            <th>Номер записи</th>
            <th>Название</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="button-container">
    <div class="button">
      <button>Добавить запись</button>
    </div>
    <div class="button">
      <button>Удалить запись</button>
    </div>
    <div class="button">
      <button>Поиск записи</button>
    </div>
    <div class="button">
      <button>Обновить таблицу</button>
    </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "TablePosition",
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(`http://localhost:8081/Pos`);
        this.items = response.data;
      } catch (error) {
        console.error("Error fetchjng data: ", error);
      }
    },
  },
};
</script>
<style src="../../assets/style.css"></style>
