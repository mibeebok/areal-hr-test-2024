<template>
  <div id="app">
    <modal-auth v-if="!isAuthenticated" @authenticated="handleAuthentication"></modal-auth>
  </div>
  <div class="container1">
    <h2>Управление сотрудниками организаций</h2>

    <div class="button-container">
      <div class="button">
        <button @click="setActiveComponent('organization')">ОРГАНИЗАЦИЯ</button>
      </div>
      <div class="button">
        <button @click="setActiveComponent('department')">ОТДЕЛ</button>
        <tableDepartment v-if="showDepartment" />
      </div>
      <div class="button">
        <button @click="setActiveComponent('position')">ДОЛЖНОСТЬ</button>
      </div>
      <div class="button">
        <button @click="setActiveComponent('employees')">СОТРУДНИКИ</button>
      </div>
      <div class="button">
        <button @click="setActiveComponent('history_of_change')">
          ИСТОРИЯ ИЗМЕНЕНИЙ
        </button>
      </div>
      <div class="button">
        <button @click="setActiveComponent('personnel_operation')">
          КАДРОВЫЕ ОПЕРАЦИИ
        </button>
      </div>
    </div>
    <component :is="activeComponent"></component>
  </div>
</template>

<script>
import axios from 'axios';


import ModalAuth from './components/ModalAuth.vue'; 


import TableDepartment from "./modules/department/table-department.vue";
import TableEmployee from "./modules/employees/table-employees.vue";
import TableHistoryOfChange from "./modules/history-of-change/table-history-of-change.vue";
import TableOrganization from "./modules/organization/table-organization.vue";
import TablePersonnelOperation from "./modules/personnel-operation/table-personnel-operations.vue";
import TablePosition from "./modules/position/table-positions.vue";

export default {
  name: "App",
  components: {
    ModalAuth,
    TableDepartment,
    TableEmployee,
    TableHistoryOfChange,
    TableOrganization,
    TablePersonnelOperation,
    TablePosition,
  },
  data() {
    return {
      data: [],
      isAuthenticated: false, // Состояние аутентификации,
      activeComponent: null,
    };
  },
  async created() {
    try {
      const response = await
      axios.get('http://localhost:8081');
      this.data = response.data;
    } catch (error){
      console.error ('Error fetching: ', error);
    }
  },
  methods: {
      handleAuthentication() {
      this.isAuthenticated = true; // Устанавливаем состояние аутентификации
    },
    setActiveComponent(component) {
      switch (component) {
        case "organization":
          this.activeComponent = TableOrganization;
          break;
        case "department":
          this.activeComponent = TableDepartment;
          break;
        case "position":
          this.activeComponent = TablePosition;
          break;
        case "employees":
          this.activeComponent = TableEmployee;
          break;
        case "history_of_change":
          this.activeComponent = TableHistoryOfChange;
          break;
        case "personnel_operation":
          this.activeComponent = TablePersonnelOperation;
          break;
        default:
          this.activeComponent = null;
      }
    },
  },
};
</script>

<style src="./assets/style.css"></style>
