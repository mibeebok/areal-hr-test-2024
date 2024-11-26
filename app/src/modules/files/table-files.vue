<template>
  <div class="container2">
    <p class="title2">Файлы</p>
    <div class="parent-container">
      <table>
        <thead>
          <tr>
            <th>Номер записи</th>
            <th>Код сотрудника</th>
            <th>Название</th>
            <th>Путь</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.id_employees }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.file_path }}</td>
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
  name: "TableFiles",
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
        const response = await axios.get(`http://localhost:8081/Fil`);
        this.items = response.data;
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    },
  },
};
</script>
<style src="../../assets/style.css"></style>
