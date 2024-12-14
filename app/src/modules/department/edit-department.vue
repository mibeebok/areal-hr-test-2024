<template>
  <div class="container2">
    <div class="container1">
      <h2>Редактирование записи отедла</h2>
      <h3>Введите код записи, которую хотите редактировать</h3>
      <form @submit.prevent="updateDepartment">
        <div class="container2">
          <label for="id">Код записи: </label>
          <input type="text" id="id" v-model="id" required />
        </div>
        <div class="container2">
          <label for="orgCode">Код организации: </label>
          <input
            type="text"
            id="orgCode"
            v-model="orgCode"
            @focus="showOrgList = true"
            @blur="hideOrgList"
          />
          <organization-list
            :organizations="organizations"
            :visible="showOrgList"
            @select="selectOrganization"
          />
        </div>
        <div class="container2">
          <label for="parent">Родительский отдел: </label>
          <input type="text" id="parent" v-model="parent" required />
        </div>
        <div class="container2">
          <label for="name">Название: </label>
          <input type="text" id="name" v-model="name" requires />
        </div>
        <div class="container2">
          <label for="comment">Комментарий: </label>
          <textarea id="comment" v-model="comment" required></textarea>
        </div>
      </form>
    </div>
    <button @click="updateDepartment">Сохранить</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>
<script>
import OrganizationList from "../organization/organization-list.vue";
import axiosInstance from '../../services/axiosInstance';

export default {
  components: {
    OrganizationList,
  },
  props: {
    department: Object,
  },
  data() {
    return {
    id: this.department ? this.department.id : "",
    orgCode: this.department ? this.department.id_organization : "",
    parent: this.department ? this.department.parent : "",
    name: this.department ? this.department.name : "",
    comment: this.department ? this.department.comment : "",
    message: "",
    showOrgList: false,
    organizations: [],
    };
  },
  mounted() {
    this.fetchOrganizations();
  },
  methods: {
    async fetchOrganizations() {
      try {
        const response = await axiosInstance.get(
          `${process.env.VUE_APP_SERVER_URL}Org/organizations`
        );
        this.organizations = response.data;
      } catch (error) {
        console.error("Error fetching organizations: ", error);
      }
    },
    selectOrganization(org) {
      this.orgCode = org.code;
      this.showOrgList = false; 
    },
    hideOrgList() {
      this.showOrgList = false; 
    },
    async updateDepartment() {
      try {
        await axiosInstance.put(
          `Dep/departments/${this.id}`,
          {
            id_organization: this.orgCode,
            parent: this.parent,
            name: this.name,
            comment: this.comment,
          }
        );
        this.message = "Запись успешно обновлена!";
        this.id = "";
        this.orgCode = "";
        this.parent = "";
        this.name = "";
        this.comment = "";
      } catch (error) {
        this.message =
          "Ошибка при обновлении записи: " + error.response.data.error;
      }
    },
  },
};
</script>
<style src="../../assets/style.css"></style>