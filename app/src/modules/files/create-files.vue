<template>
  <div class="container2">
    <div class="container1">
      <h2>Добавление новых файлов</h2>
      <form @submit.prevent="createFiles">
        <div class="container2">
          <label for="idEmpl">Код сотрудника</label>
          <input
            type="text"
            id="idEmpl"
            v-model="idEmpl"
            @focus="showEmplList = true"
            @blur="hideEmplList"
          />
          <employees-list
            :employees="employees"
            :visible="showEmplList"
            @select="selectEmployees"
          />
        </div>
        <div class="container2">
          <label for="name">Название файла: </label>
          <input type="text" id="name" v-model="name" required/>
        </div>
        <div class="container2">
          <label for="path">Путь до файла</label>
          <input type="text" id="path" v-model="path" required/>
        </div>
      </form>
    </div>
    <button type="submit">Сохранить</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>
<script>
import EmployeesList from "../employees/employees-list.vue";
import axios from "axios";

export default {
  components: {
    EmployeesList,
  },
  data() {
    return {
      idEmpl: "",
      name: "",
      path: "",
      create_at: new Date(),
      message: "",
      showEmplList: false,
      employees: [],
    };
  },
  mounted() {
    this.fetchEmployees();
  },
  methods: {
    async fetchEmployees() {
      try {
        const response = await axios.get(
          "http://localhost:8081/Empl/employees"
        );
        this.employees = response.data;
      } catch (error) {
        console.error("Error fetching employees: ", error);
      }
    },
    selectEmployees(empl) {
      this.idEmpl = empl.code;
      this.showEmplList = false;
    },
    hideEmplList() {
      this.showEmplList = false;
    },
    async createFiles() {
      try {
        const response = await axios.post("http://localhost:8081/Fil/files", {
          idEmpl: this.idEmpl,
          name: this.name,
          path: this.path,
          create_at: new Date(),
        });
        this.message = response.data;
        this.idEmpl = "";
        this.name = "";
        this.path = "";
        this.create_at = new Date();
      } catch (errir) {
        this.message = "Error create";
      }
    },
  },
};
</script>
<style src="../../assets/style.css"></style>
