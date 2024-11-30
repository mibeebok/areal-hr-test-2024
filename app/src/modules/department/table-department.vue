<template>
  <div class="container2">
    <p class="title2">Отделы</p>
    <div class="parent-container">
      <table>
        <thead>
          <tr>
            <th>Номер записи</th>
            <th>Организация</th>
            <th>Родительский отдел</th>
            <th>Название</th>
            <th>Комментарий</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.id_organization }}</td>
            <td>{{ item.parent }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.comment }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="button-container">
    <div class="button">
      <button @click="createDepartments">Добавить запись</button>
    </div>
    <div class="button">
      <button @click="deleteDepartments">Удалить запись</button>
    </div>
    <div class="button">
      <button @click="getOneDepartments">Поиск записи</button>
    </div>
    <div class="button">
      <button @click="updateDepartments">Обновить таблицу</button>
    </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "TableDepartment",
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
        const response = await axios.get(`http://localhost:8081/Dep`);
        this.items = response.data;
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    },
  },
};
</script>
<style src="../../assets/style.css"></style>
