<template>
  <form @submit.prevent="createDepartment">
    <div class="container2">
      <div class="container1">
        <h2>Добавление нового отедла</h2>
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
        <button type="submit">Сохранить</button>
        <p v-if="message">{{ message }}</p>
      </div>
    </div>
  </form>
</template>
<script>
import OrganizationList from "../organization/organization-list.vue";
import axiosInstance from '../../services/axiosInstance';

export default {
  components: {
    OrganizationList,
  },
  data() {
    return {
      orgCode: "",
      parent: "",
      name: "",
      comment: "",
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
    async createDepartment() {
      try {
        const response = await axiosInstance.post(
          `${process.env.VUE_APP_SERVER_URL}Dep/departments`,
          {
            orgCode: this.orgCode,
            parent: this.parent,
            name: this.name,
            comment: this.comment,
          }
        );
        this.message = response.data;
        this.orgCode = "";
        this.parent = "";
        this.name = "";
        this.comment = "";
      } catch (error) {
        this.message = "Ошибка при добавлении";
      }
    },
  },
};
</script>
<style src="../../assets/style.css"></style>
