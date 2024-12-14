<template>
  <div class="container2">
    <div class="container1">
      <h2>Добавление новой кадровой операции</h2>
      <form @submit.prevent="CreatePersonnelOperations">
        <div class="container2">
          <label for="idEmpl">Код сотрудника: </label>
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
          <label for="idDep">Код отдела: </label>
          <input
            type="text"
            id="idDep"
            v-model="idDep"
            @focus="showDepList = true"
            @blur="hideDepList"
          />
          <departments-list
            :department="department"
            :visible="showDepList"
            @select="selectDepartment"
          />
        </div>
        <div class="container2">
          <label for="idPos">Код должности: </label>
          <input
            type="text"
            id="idPos"
            v-model="idPos"
            @focus="showPosList = true"
            @blur="hidePosList"
          />
          <positions-list
            :position="position"
            :visible="showPosList"
            @select="selectPosition"
          />
        </div>
        <div class="container2">
          <label for="setSalary">Установка ЗП: </label>
          <input type="number" id="setSalary" v-model="setSalary" required />
        </div>
        <div class="container2">
          <label for="changeSalary">Изменение ЗП: </label>
          <input
            type="number"
            id="changeSalary"
            v-model="changeSalary"
            required
          />
        </div>
        <div class="container2">
          <label for="dismissal">Увольнение с работы: </label>
          <input type="radio" id="dismissal" v-model="dismissal" required />
        </div>
      </form>
    </div>
    <button type="submit">Сохранить</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>
<script>
import axiosInstance from '../../services/axiosInstance';
import employeesList from "../employees/employees-list.vue";
import departmentsList from "../department/departments-list.vue";
import positionsList from "../position/positions-list.vue";

export default {
  components: {
    employeesList,
    departmentsList,
    positionsList
  },
  data() {
    return {
      idEmpl: "",
      idDep: "",
      idPos: "",
      setSalary: "",
      changeSalary: "",
      dismissal: "",
      message: "",
      showEmplList: false,
      employees: [],
      showDepList: false,
      department: [],
      showPosList: false,
      position: [],
    };
  },
  mounted() {
    this.fetchEmployees();
    this.fetchDepartment();
    this.fetchPosition();
  },
  methods: {
    async fetchEmployees() {
      try{
        const response = await axiosInstance.get(`Empl/employees`);
        this.employees = response.data;
      }catch (error){
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
    async fetchDepartment() {
      try{
        const response = await axiosInstance.get(`Dep/department`);
        this.department = response.data;
      }catch (error){
        console.error("Error fetching department: ", error);
      }
    },
    selectDepartment(dep) {
      this.idDep = dep.code;
      this.showDepList = false;
    },
    hideDepList() {
      this.showDepList = false;
    },
    async fetchPosition() {
      try{
        const response = await axiosInstance.get(`Pos/position`);
        this.position = response.data;
      }catch (error){
        console.error("Error fetching position: ", error);
      }
    },
    selectPosition(pos) {
      this.idPos = pos.code;
      this.showPosList = false;
    },
    hidePosList() {
      this.showPosList = false;
    },
    async CreatePersonnelOperations() {
      try {
        const response = await axiosInstance.post(
          `PerOP/personnel_operations`,
          {
            idEmpl: this.idEmpl,
            idDep: this.idDep,
            idPos: this.idPos,
            setSalary: this.setSalary,
            changeSalary: this.changeSalary,
            dismissal: this.dismissal,
          }
        );
        this.message = response.data;
        this.idEmpl= "";
        this.idDep= "";
        this.idPos= "";
        this.setSalary="";
        this.changeSalary= "";
        this.dismissal= "";
      } catch (error) {
        this.message = "Ошибка при добавлении записи";
      }
    },
  },
};
</script>
<style src="../../assets/style.css"></style>
