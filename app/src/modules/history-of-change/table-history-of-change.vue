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
      <button @click="getOneHistoryOfChange">Поиск записи</button>
    </div>
    <div class="button">
      <button @click="updateHistoryOfChange">Обновить таблицу</button>
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
                const response = await axios.get (`http://localhost:8081/His/history_of_change`);
                this.items = response.data;
            }catch (error){
                console.error("Error fetching data: ", error);
            }
        },
        async getOneHistoryOfChange() {
          const getOneHistoryOfChange = prompt ("Введите ID для поиска: ");
          if (getOneHistoryOfChange){
            try{
              const response = await axios.get ("hhtp://localhost:8081/His/history_of_change/:id", getOneHistoryOfChange);
              this.items = response.data.histirys || [];
            }catch (error){
              console.error("Error searching for history of change: ", error);
            }
          }
        },
        async updateHistoryOfChange() {
          this.fetchData();
        }
    }
}
</script>
<style src="../../assets/style.css"></style>
