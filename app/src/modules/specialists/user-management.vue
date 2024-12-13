<template>
  <div class="container2">
    <p class="title2">Пользователи</p>
    <div class="parent-container">
      <table>
        <thead>
          <tr>
            <th>Логин</th>
            <th>Пароль</th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Роль</th>
          </tr> 
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.login }}</td>
            <td>{{ user.password }}</td>
            <td>{{ user.surname }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.patronymic }}</td>
            <td>{{ user.roles }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="button-container">
      <div class="button" v-if="isAdmin">
        <button @click="showCreateUserModal">Создать пользователя</button>
      </div>
      <div class="button">
        <button @click="updateUsers">Обновить таблицу</button>
      </div>
      <div class="button">
        <button @click="showEditUserModal(user)">Редактировать</button>
      </div>
      <div class="button">
        <button @click="deleteUser (user.id)">Удалить</button>
      </div>
    </div>
    <modal-auth v-if="showModalAuth" @authenticated="handleAuthentication" @close="closeAuthModal"></modal-auth>
    <modal-create-user v-if="showCreateUser " @close="closeCreateUserModal" @user-created="fetchUsers"></modal-create-user>
    <modal-edit-user v-if="showEditUser " :user="selectedUser " @close="closeEditUserModal" @user-updated="fetchUsers"></modal-edit-user>
  </div>
</template>
  
  <script>
  import axiosInstance from '../../services/axiosInstance';
  import ModalAuth from '../../components/ModalAuth.vue';
  import ModalCreateUser  from '../../components/ModalCreateUser.vue';
  import ModalEditUser  from '../../components/ModalEditUser.vue';
  
  export default {
    components: {
      ModalAuth,
      ModalCreateUser ,
      ModalEditUser ,
    },
    data() {
      return {
        users: [],
        isAuthenticated: false,
        isAdmin: false, // Состояние для роли администратора
        activeComponent: null,
        showModalAuth: false,
        showCreateUser: false,
        showEditUser:  false,
        selectedUser: null,
      };
    },
    methods: {
      showAuthModal() {
        this.showModalAuth = true;
      },
      closeAuthModal() {
        this.showModalAuth = false;
      },
      handleAuthentication(user) {
        this.isAuthenticated = true;
        this.isAdmin = user.role === 'admin'; // Проверка роли
        this.closeAuthModal();
        if (this.isAdmin) {
          this.fetchUsers(); // Загружаем пользователей, если админ
        }
      },
      fetchUsers() {
        axiosInstance.get(`${process.env.VUE_APP_SERVER_URL}api/users`)
          .then(response => {
            this.users = response.data;
          })
          .catch(error => {
            console.error('Error fetching users: ', error);
          });
      },
      showCreateUserModal() {
        this.showCreateUser  = true;
      },
      closeCreateUserModal() {
        this.showCreateUser  = false;
      },
      showEditUserModal(user) {
        this.selectedUser  = user;
        this.showEditUser  = true;
      },
      closeEditUserModal() {
        this.selectedUser  = null;
        this.showEditUser  = false;
      },
      deleteUser (userId) {
        axiosInstance.delete(`${process.env.VUE_APP_SERVER_URL}api/users/${userId}`)
          .then(() => {
            this.fetchUsers(); // Обновляем список пользователей
          })
          .catch(error => {
            console.error('Error deleting user: ', error);
          });
      },
    },
  };
  </script>
  
  <style src="../../assets/style.css"></style>
  