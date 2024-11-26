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
import axios from "axios";
export default {
    name: "TablePersonnelOperation",
    data(){
        return {
            items: [],
        };
    },
    mountad() {
        this.fetshData();
    },
    methods: {
        async fetchData() {
            try{
                const response = await axios.get(`http://localhost:8081/PerOp`);
                this.items = response.data;
            } catch (error) {
                console.error ("Error fetching data: ", error);
            }
        }
    }
}
</script>
<style src="../../assets/style.css"></style>
