<template>
  <div class="container2">
    <p class="title2">История изменений</p>
    <div class="parent-container">
      <table>
        <thead>
          <tr>
            <th>Номер записи</th>
            <th>Дата время операции</th>
            <th>Кто внес изменения</th>
            <th>Объект опреции</th>
            <th>Измененный файл</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.date_and_time_of_the_operation }}</td>
            <td>{{ item.who_changed_it }}</td>
            <td>{{ item.the_object_of_operation }}</td>
            <td>{{ item.changed_fields }}</td>
          </tr>
        </tbody>
      </table>
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
import axios from 'axios';
export default{
    name: 'TableHistoryOfChange',
    data(){
        return{
            items: []
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try{
                const response = await axios.get (`http://localhost:8081/His`);
                this.items = response.data;
            }catch (error){
                console.error("Error fetching data: ", error);
            }
        }
    }
}
</script>
<style src="../../assets/style.css"></style>
