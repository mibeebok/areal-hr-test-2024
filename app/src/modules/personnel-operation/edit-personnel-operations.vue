<template>
    <div class="container2">
      <div class="container1">
        <h2>Редактирование кадровой операции</h2>
        <form @submit.prevent="updatePersonnelOperations">
          <div class="container2">
            <label for="id">Код записи: </label>
            <input type="text" id="id" v-model="id" required />
          </div>
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
      <input v-model="id" type="text" placeholder="Введите ID записи" />
      <button @click="fetchPersonnelOperations">Загрузить данные</button>
      <button @click="updatePersonnelOperations">Редактировать</button>
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
        id: "",
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

      async fetchPersonnelOperations() {
        try {
            const response = await axiosInstance.get(`PerOP/personnel_operations/:${this.id}`);
            this.idEmpl = response.data.id_employee;
            this.idDep = response.data.id_department;
            this.idPos = response.data.id_position;
            this.setSalary = response.data.setting_the_salary;
            this.changeSalary = response.data.salary_change;
            this.dismissal = response.data.dismissal_from_work;
            this.message = ''; 
        } catch (error) {
            this.message = `Ошибка при загрузке данных: ${error.response ? error.response.data.error : error.message}`;
        }
    },

      async updatePersonnelOperations() {
        try{
            await axiosInstance.put (
                `PerOP/personnel_operations/:${this.id}`,
                {
                id_employee: this.idEmpl,
                id_department: this.idDep,
                id_position: this.idPos,
                setting_the_salary: this.setSalary,
                salary_change: this.changeSalary,
                dismissal_from_work: this.dismissal,
                }
            );
            this.message = "Запись успешно обновлена";
          this.idEmpl= "";
          this.idDep= "";
          this.idPos= "";
          this.setSalary="";
          this.changeSalary= "";
          this.dismissal= "";
        } catch (error){
            this.message = "Ошибка при обновлении записи: ", error.response.data.error;
        }
      }
    },
  };
  </script>
  <style src="../../assets/style.css"></style>
  