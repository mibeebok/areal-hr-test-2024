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
            <tr v-for="passportItem in passportItems" :key="passportItem.id">
              <td>{{ passportItem.id }}</td>
              <td>{{ passportItem.series }}</td>
              <td>{{ passportItem.number }}</td>
              <td>{{ passportItem.date_of_issue }}</td>
              <td>{{ passportItem.unit_code }}</td>
              <td>{{ passportItem.issued_by_whom }}</td>
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
            <tr v-for="adressItem in adressItems" :key="adressItem.id">
              <td>{{ adressItem.id }}</td>
              <td>{{ adressItem.region }}</td>
              <td>{{ adressItem.locality }}</td>
              <td>{{ adressItem.street }}</td>
              <td>{{ adressItem.house }}</td>
              <td>{{ adressItem.building }}</td>
              <td>{{ adressItem.apartment }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

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
          <tr v-for="filesItem in filesItems" :key="filesItem.id">
            <td>{{ filesItem.id }}</td>
            <td>{{ filesItem.id_employees }}</td>
            <td>{{ filesItem.name }}</td>
            <td>{{ filesItem.file_path }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</div>
    <div class="button-container">
    <div class="button">
      <button @click="showFormCerateEmpl = !showFormCerateEmpl">
        {{showFormCerateEmpl ? 'Скрыть форму добавления' : 'Добавить запись'}}</button>
    </div>
    <div class="button">
      <button @click="showFormUpdateEmpl = !showFormUpdateEmpl">
        {{showFormUpdateEmpl ? 'Скрыть форму зедактирования' : 'Редактировать запись'}}</button>
    </div>
    <div class="button">
      <button @click="deleteEmployees">Удалить запись</button>
    </div>
    <div class="button">
      <button @click="getOneEmployees">Поиск записи</button>
    </div>
    <div class="button">
      <button @click="updateEmployeess">Обновить таблицу</button>
    </div>
    </div>
  </div>
  <createEmployees v-if="showFormCerateEmpl"/>
  <updateEmployees v-if="showFormUpdateEmpl"/>
</template>
<script>
import axiosInstance from '../../services/axiosInstance';
import createEmployees from "./create-employees.vue";
import updateEmployees from "./edit-employees.vue";

export default {
  name: "TableEmployee",
  components: {
    createEmployees,
    updateEmployees,
  },
  data() {
    return {
      showFormCerateEmpl: false,
      showFormUpdateEmpl: false,
      items: [],
      passportItems: [],
      adressItems: [],
      filesItems: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axiosInstance.get(`Empl/employees`);
        this.items = response.data.employees || [];
        this.passportItems = response.data.passports || [];
        this.adressItems = response.data.adresses || [];
        this.filesItems = response.data.files || [];
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    },
    async deleteEmployees() {
      const employeesId = prompt ("Введите ID для удаления: ");
      if (employeesId) {
        try{
          await axiosInstance.get (`Empl/employees/:${employeesId}`);
          this.fetchData();
        }catch (error) {
          console.error ("Error deleting employees: ", error);
        }
      }
    },
    async getOneEmployees () {
      const getOneEmployees = prompt ("Введите ID для поиска: ");
      if (getOneEmployees) {
        try{
          const response = await axiosInstance.get (`Empl/employees/:${getOneEmployees}`);
          this.items = response.data.employees || [];
        }catch (error){
          console.error ("Error searching for employees: ", error);
        }
      }
    },
    async updateEmployeess () {
      this.fetchData();
    }
  },
};
</script>
<style src="../../assets/style.css"></style>
