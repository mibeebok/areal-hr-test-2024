<template>
  <div class="container2">
    <div class="container1">
      <h2>Добавление нового отедла</h2>
      <form @submit.prevent="createDepartment">
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
    <button type="submit">Сохранить</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>
<script>
import OrganizationList from "../organization/organization-list.vue";
import axios from "axios";

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
      create_at: new Date(),
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
        const response = await axios.get(
          "http://localhost:8081/Org/organizations"
        );
        this.organizations = response.data;
      } catch (error) {
        console.error("Error fetching organizations: ", error);
      }
    },
    selectOrganization(org) {
      this.orgCode = org.code;
      this.showOrgList = false; // Скрыть список после выбора
    },
    hideOrgList() {
      this.showOrgList = false; // Скрыть список при потере фокуса
    },
    async createDepartment() {
      try {
        const response = await axios.post(
          "http://localhost:8081/Dep/department",
          {
            orgCode: this.orgCode,
            parent: this.parent,
            name: this.name,
            comment: this.comment,
            create_at: new Date(),
          }
        );
        this.message = response.data;
        this.orgCode = "";
        this.parent = "";
        this.name = "";
        this.comment = "";
        this.create_at = new Date();
      } catch (error) {
        this.message = "Ошибка при добавлении";
      }
    },
  },
};
</script>
<style src="../../assets/style.css"></style>
