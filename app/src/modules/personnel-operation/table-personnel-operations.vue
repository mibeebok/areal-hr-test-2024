<template>
  <div class="container2">
    <p class="title2">Кадровые операции</p>
    <div class="parent-container">
      <table>
        <thead>
          <tr>
            <th>Номер записи</th>
            <th>Код сотрудника</th>
            <th>Код отдела</th>
            <th>Код должности</th>
            <th>Установка зарплаты</th>
            <th>Изменение зарплаты</th>
            <th>Увольнение</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.id_employee }}</td>
            <td>{{ item.id_department }}</td>
            <td>{{ item.id_position }}</td>
            <td>{{ item.setting_the_salary }}</td>
            <td>{{ item.salary_change }}</td>
            <td>{{ item.dismissal_from_work }}</td>
          </tr>
        </tbody>
      </table>
  </div>
  <div class="button-container">
    <div class="button">
      <button @click="showFormCreateOper = !showFormCreateOper">
        {{ showFormCreateOper ? "Скрыть форму добавления" : "Добавить запись" }}
      </button>
    </div>
    <div class="button">
      <button @click="showFormEditOper = !showFormEditOper">
        {{ showFormEditOper ? "Скрыть форму редактирования" : "Редактировать запись" }}
      </button>
    </div>
      <div class="button">
        <button @click="deleteOperation">Удалить запись</button>
      </div>
      <div class="button">
        <button @click="getOneOperation">Поиск записи</button>
      </div>
      <div class="button">
        <button @click="updateOperation">Обновить таблицу</button>
      </div>
    </div>
  </div>
  <div>
  <CreatePersonnelOperations v-if="showFormCreateOper" />
  </div>
  <div>
  <updatePersonnelOperations v-if="showFormEditOper" />
  </div>
</template>
<script>
import axios from "axios";
import CreatePersonnelOperations from "./create-personnel-operations.vue";
import updatePersonnelOperations from "./edit-personnel-operations.vue";

export default {
  name: "TablePersonnelOperation",
  components: {
    CreatePersonnelOperations,
    updatePersonnelOperations,
  },
  data() {
    return {
      showFormCreateOper: false,
      showFormEditOper: false,
      items: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(`http://localhost:8081/PerOP`);
        this.items = response.data;
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    },
    async deleteOperation() {
      const operationId = prompt("Введите ID для удаления: ");
      if (operationId) {
        try {
          await axios.get(
            "http://localhost:8081/PerOP/personnel_operations/:id",{
              operationId
            }
          );
          this.fetchData();
        } catch (error) {
          console.error("Error deleting operation: ", error);
        }
      }
    },
    async getOneOperation() {
      const getOneOperation = prompt("Введите ID для поиска: ");
      if (getOneOperation) {
        try {
          const response = await axios.get(
            "http://localhost:8081/PerOP/personnel_operations/:id",{
              getOneOperation
            }
          );
          this.items = response.data.operations || [];
        } catch (error) {
          console.error("Error searching for operation: ", error);
        }
      }
    },
    async updateOperation() {
      this.fetchData();
    },
  },
};
</script>
<style src="../../assets/style.css"></style>
