<template>
  <div class="container2">
    <div class="container1">
      <h2>Добавление нового сотрудника</h2>
      <form @submit.prevent="createEmployees">
        <div class="container2">
          <label for="firstName">Фамилия: </label>
          <input type="text" id="firstName" v-model="firstName" required/>
        </div>
        <div class="container2">
          <label for="name">Имя: </label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div class="container2">
          <label for="patronymic">Отчество: </label>
          <input type="text" id="patronymic" v-model="patronymic" required/>
        </div>
        <div class="container2">
          <label for="dateBirth">Дата рождения: </label>
          <input type="date" id="dateBirth" v-model="dateBirth" required/>
        </div>
      </form>
    </div>
    <div class="container1">
      <form @submit.prevent="createPassportData">
        <div class="container2">
          <label for="series">Серия: </label>
          <input type="text" id="series" v-model="series" required/>
        </div>
        <div class="container2">
          <label for="number">Номер: </label>
          <input type="text" id="number" v-model="number" required/>
        </div>
        <div class="container2">
          <label for="dateIssue">Дата выдачи: </label>
          <input type="text" id="dateIssue" v-model="dateIssue" required/>
        </div>
        <div class="container2">
          <label for="unitCode">Код подразделения: </label>
          <input type="text" id="unitCode" v-model="unitCode" required/>
        </div>
        <div class="container2">
          <label for="whoIssued">Кем выдан: </label>
          <input type="text" id="whoIssued" v-model="whoIssued" required/>
        </div>
      </form>
    </div>
    <div class="container1">
      <form @submit.prevent="cretaeRegistrationAdress">
        <div class="container2">
          <label for="region">Область: </label>
          <input type="text" id="region" v-model="region" required/>
        </div>
        <div class="container2">
          <label for="locality">Населенный пункт: </label>
          <input type="text" id="locality" v-model="locality" required/>
        </div>
        <div class="container2">
          <label for="street">Улица: </label>
          <input type="text" id="street" v-model="street" required/>
        </div>
        <div class="container2">
          <label for="house">Номер дома: </label>
          <input type="text" id="house" v-model="house" required/>
        </div>
        <div class="container2">
          <label for="building">Корпус: </label>
          <input type="text" id="building" v-model="building" required/>
        </div>
        <div class="container2">
          <label for="apartment">Квартира: </label>
          <input type="text" id="apartment" v-model="apartment" required/>
        </div>
      </form>
    </div>
    <button type="submit">Сохранить</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      firstName: "",
      name: "",
      patrinymic: "",
      dateBirth: "",
      series: "",
      number: "",
      dateIssue: "",
      unitCode: "",
      whoIssued: "",
      region: "",
      locality: "",
      street: "",
      house: "",
      building: "",
      apartment: "",
      create_at: new Date(),
      message: "",
    };
  },
  methods: {
    async createEmployees() {
      try {
        const response = await axios.post(
          "http://localhost:8081/Empl/employees",
          {
            firstName: this.firstName,
            name: this.name,
            patrinymic: this.patrinymic,
            dateBirth: this.dateBirth,
            series: this.series,
            number: this.number,
            dateIssue: this.dateBirth,
            unitCode: this.unitCode,
            whoIssued: this.whoIssued,
            region: this.region,
            locality: this.locality,
            street: this.street,
            house: this.house,
            building: this.building,
            apartment: this.apartment,
            create_at: new Date(),
          }
        );
        this.message = response.data;
        this.firstName = "";
        this.name = "";
        this.patrinymic = "";
        this.dateBirth = "";
        this.series = "";
        this.number = "";
        this.dateBirth = "";
        this.unitCode = "";
        this.whoIssued = "";
        this.region = "";
        this.locality = "";
        this.street = "";
        this.house = "";
        this.building = "";
        this.apartment = "";
      } catch (error) {
        this.message = "Error create for Employees";
      }
    },
  },
};
</script>
<style src="../../assets/style.css"></style>
