<template>
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
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.id_employees }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.file_path }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="button-container">
    <div class="button">
      <button @click="showFormCreateFil = !showFormCreateFil">
        {{showFormCreateFil ? 'Скрыть форму добавления' : 'Добавить запись'}}
      </button>
    </div>
    <div class="button">
      <button @click="deleteFiles">Удалить запись</button>
    </div>
    <div class="button">
      <button @click="getOneFiles">Поиск записи</button>
    </div>
    <div class="button">
      <button @click="updateFiles">Обновить таблицу</button>
    </div>
    </div>
  </div>
  <createFiles v-if="showFormCreateFil"/>
</template>
<script>
import axiosInstance from '../../services/axiosInstance';
import createFiles from "./create-files.vue";

export default {
  name: "TableFiles",
  components:{
    createFiles
  },
  data() {
    return {
      showFormCreateFil: false,
      items: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axiosInstance.get(`${process.env.VUE_APP_SERVER_URL}Fil/files`);
        this.items = response.data;
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    },
    async deleteFiles() {
      const filesId = prompt ("Введите ID для удаления: ");
      if(filesId){

      try{
        await axiosInstance.get(`${process.env.VUE_APP_SERVER_URL}Fil/files/:id`, filesId);
        this.fetchData;
      }catch (error){
        console.error ("error deleting files: ", error);
      }
    }
    },
    async getOneFiles () {
      const getOneFiles = prompt ("Введите ID для поиска: ");
      if (getOneFiles){
        try{
          const response = await axiosInstance.get (`${process.env.VUE_APP_SERVER_URL}Fil/files/:id`, getOneFiles);
          this.items = response.data.files || [];
        }catch (error) {
          console.error ("Error searching for files: ", error);
        }
      }
    },
    async updateFiles () {
      this.fetchData();
    }
  },
};
</script>
<style src="../../assets/style.css"></style>
