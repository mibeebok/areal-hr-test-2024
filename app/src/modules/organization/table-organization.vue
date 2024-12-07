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
    <button @click="showFormCreateOrg = !showFormCreateOrg">
      {{ showFormCreateOrg ? 'Скрыть форму добавления' : 'Добавить запись' }}
    </button>
    </div>
    <div class="button">
    <button @click="showFormUpdateOrg = !showFormUpdateOrg">
      {{ showFormUpdateOrg ? 'Скрыть форму редактирования' : 'Редактировать запись' }}
    </button>
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
    <createOrganization v-if="showFormCreateOrg" />
    <updateOrganizaiton v-if="showFormUpdateOrg"/>
</template>
<script>
import axios from 'axios'
import createOrganization from './create-organization.vue';
import updateOrganizaiton from "./edit-organizations.vue";
export default{
    name: 'TableOrganization',
    components:{
      createOrganization,
      updateOrganizaiton,
    },
    data(){
        return{
          showFormCreateOrg: false,
            items: [],
        };
    },
    mounted () {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try{
                const response = await axios.get(`http://localhost:8081/Org/organization`);
                this.items = response.data;
            }catch (error){
                console.error("Error fetching data: ", error);
            }
        },
        async deleteOrganizations() {
          const organizationId = prompt("Введите ID записи для удаления: ");
          if (organizationId) {
            try {
              await axios.get ("http://localhost:8081/Org/organization/:id", organizationId);
              this.fetchData();
            }catch (error) {
              console.error("Error deleting organization: ", error);
            }
          }
        },
        async getOneOrganizations() {
          const getOneOrganization = prompt ("Введите ID для поиска: ");
          if (getOneOrganization) {
            try{
              const response = await axios.get ("http://localhost:8081/Org/organization/:id", getOneOrganization);
              this.items = response.data.organizations || [];
            } catch (error) {
              console.error("Error searching for organizations: ", error);
            }
          }
        },
        async updateOrganizations (){
          this.fetchData();
        }
    }
}
</script>
<style src="../../assets/style.css"></style>
