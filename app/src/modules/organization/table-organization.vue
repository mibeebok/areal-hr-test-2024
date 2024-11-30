<template>
  <div class="container2">
    <p class="title2">Организация</p>
    <div class="parent-container">
      <table>
        <thead>
          <tr>
            <th>Номер записи</th>
            <th>Название</th>
            <th>Комментарий</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.comment }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="button-container">
    <div class="button">
      <button @click="createOrganizations">Добавить запись</button>
    </div>
    <div class="button">
      <button @click="deleteOrganizations">Удалить запись</button>
    </div>
    <div class="button">
      <button @click="getOneOrganizations">Поиск записи</button>
    </div>
    <div class="button">
      <button @click="updateOrganizations">Обновить таблицу</button>
    </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default{
    name: 'TableOrganization',
    data(){
        return{
            items: [],
        };
    },
    mounted () {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try{
                const response = await axios.get(`http://localhost:8081/Org`);
                this.items = response.data;
            }catch (error){
                console.error("Error fetching data: ", error);
            }
        },
        async createOrganizations() {
          const newOrganization = {
            name: "OOO Organization",
            comment: "vse horosho! :-)",
          };
          try{
            await axios.post("http://localhost:8081/Org/organization", newOrganization);
            this.fetchData();
          }catch(error){
            console.error("Error creating organization: ", error);
          }
        },
        async deleteOrganizations() {
          const organizationId = prompt("Введите ID записи для удаления: ");
          if (organizationId) {
            try {
              await axios.delete ("http://localhost:8081/Org/organization/:id", organizationId);
              this.fetchData();
            }catch (error) {
              console.error("Error deleting organization: ", error);
            }
          }
        },
        async getOneOrganizations() {
          const getOneOrganization = prompt ("Введите название для поиска: ");
          if (getOneOrganization) {
            try{
              const response = await axios.get ("http://localhost:8081/Org/organization/:id", getOneOrganization);
              this.items = response.data.organizations || [];
            } catch (error) {
              console.error("Error searching for organizations: ", error);
            }
          }
        },
        async updateTable (){
          this.fetchData();
        }
    }
}
</script>
<style src="../../assets/style.css"></style>
