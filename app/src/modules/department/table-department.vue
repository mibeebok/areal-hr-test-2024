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
      <button @click="showFormCreateDep = !showFormCreateDep">
        {{showFormCreateDep ? 'Скрыть форму добавления' : 'Добавить запись'}}
      </button>
    </div>
    <div class="button">
      <button @click="showFormUpdateDep = !showFormUpdateDep">
        {{showFormUpdateDep ? 'Скрыть форму редактирования' : 'Редактировать запись'}}
      </button>
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
  <div>
    <createDepartment v-if="showFormCreateDep" />
    <updateDepartment v-if="showFormUpdateDep" />
  </div>
</template>
<script>
import axiosInstance from '../../services/axiosInstance';
import createDepartment from "./create-department.vue";
import updateDepartment from "./edit-department.vue";

export default {
  name: "TableDepartment",
  components: {
    createDepartment,
    updateDepartment
  },
  data() {
    return {
      showFormCreateDep: false,
      showFormUpdateDep: false,
      items: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axiosInstance.get(`Dep/departments`);
        this.items = response.data;
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    },
    async deleteDepartments() {
      const departmentId = prompt ("Введите ID для удаления: ");
      if (departmentId){
        try {
          await axiosInstance.get (`Dep/departments/:${departmentId}`);
          this.fetchData();
        } catch (error) {
          console.error ("Error deleting department: ", error);
        }
      }
    },
    async getOneDepartments () {
      const getOneDepartments = prompt ("Введите ID для поиска: ");
      if (getOneDepartments){
        try{
          const response = await axiosInstance.get (`Dep/departments/:${getOneDepartments}`);
          this.items = response.data.departments || [];
        } catch (error) {
          console.error ("Error searching for department: ", error);
        }
      }
    },
    async updateDepartments () {
      this.fetchData();
    }
  },
};
</script>
<style src="../../assets/style.css"></style>
