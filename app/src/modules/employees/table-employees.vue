<template>
  <div class="container2">
    <p class="title2">Сотрудники</p>
    <div class="parent-container">
      <table>
        <thead>
          <tr>
            <th>Номер записи</th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Дата рождения</th>
            <th>Идентификатор паспортных данных</th>
            <th>Идентификатор адреса регистрации</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.first_name }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.patronymic }}</td>
            <td>{{ item.date_of_birth }}</td>
            <td>{{ item.id_passport_data }}</td>
            <td>{{ item.id_registration_adress }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container2">
      <p class="title2">Паспортные данные</p>
      <div class="parent-container">
        <table>
          <thead>
            <tr>
              <th>Номер записи</th>
              <th>Серия</th>
              <th>Номер</th>
              <th>Дата выдачи</th>
              <th>Код подразделения</th>
              <th>Кем выдан</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.series }}</td>
              <td>{{ item.number }}</td>
              <td>{{ item.date_of_issue }}</td>
              <td>{{ item.unit_code }}</td>
              <td>{{ item.issued_by_whom }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="container2">
      <p class="title2">Адрес регистрации</p>
      <div class="parent-container">
        <table>
          <thead>
            <tr>
              <th>Номер записи</th>
              <th>Область</th>
              <th>Населенный пункт</th>
              <th>Улица</th>
              <th>Номер дома</th>
              <th>Корпус</th>
              <th>Квартира</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.region }}</td>
              <td>{{ item.locality }}</td>
              <td>{{ item.street }}</td>
              <td>{{ item.house }}</td>
              <td>{{ item.building }}</td>
              <td>{{ item.apartment }}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
  name: "TableEmployee",
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
        const response = await axios.get(`http://localhost:8081/Empl`);
        this.items = response.data;
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    },
  },
};
</script>
<style src="../../assets/style.css"></style>
