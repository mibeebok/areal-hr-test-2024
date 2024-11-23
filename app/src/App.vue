<template>
  <div class="container1">
    <h2>Управление сотрудниками организаций</h2>

    <div class="button-container">
      <div class="button">
        <button @click="setActiveComponent('organization')">ОРГАНИЗАЦИЯ</button>
      </div>
      <div class="button">
        <button @@click="setActiveComponent('department')">ОТДЕЛ</button>
        <tableDepartment v-if="showDepartment" />
      </div>
      <div class="button">
        <button @click="setActiveComponent('position')">ДОЛЖНОСТЬ</button>
      </div>
      <div class="button">
        <button @click="setActiveComponent('employees')">СОТРУДНИКИ</button>
      </div>
      <div class="button">
        <button @click="setActiveComponent('files')">ФАЙЛЫ</button>
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
import TableDepartment from "./modules/department/table-department.vue";
import TableEmployee from "./modules/employees/table-employees.vue";
import TableFiles from "./modules/files/table-files.vue";
import TableHistoryOfChange from "./modules/history-of-change/table-history-of-change.vue";
import TableOrganization from "./modules/organization/table-organization.vue";
import TablePersonnelOperation from "./modules/personnel-operation/table-personnel-operations.vue";
import TablePosition from "./modules/position/table-positions.vue";

export default {
  name: "App",
  components: {
    TableDepartment,
    TableEmployee,
    TableFiles,
    TableHistoryOfChange,
    TableOrganization,
    TablePersonnelOperation,
    TablePosition,
  },
  data() {
    return {
      activeComponent: null,
    };
  },
  methods: {
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
        case "employee":
          this.activeComponent = TableEmployee;
          break;
        case "files":
          this.activeComponent = TableFiles;
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
