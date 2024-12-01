<template>
  <div class="container2">
    <p class="title2">Должности</p>
    <div class="parent-container">
      <table>
        <thead>
          <tr>
            <th>Номер записи</th>
            <th>Название</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="button-container">
      <div class="button">
        <button @click="showFormCreatePos = !showFormCreatePos">
          {{
            showFormCreatePos ? "Скрыть форму добавления" : "Добавить запись"
          }}
        </button>
      </div>
      <div class="button">
        <button @click="deletePosition">Удалить запись</button>
      </div>
      <div class="button">
        <button @click="getOnePosition">Поиск записи</button>
      </div>
      <div class="button">
        <button @click="updatePosition">Обновить таблицу</button>
      </div>
    </div>
  </div>
  <CreatePositions v-if="showFormCreatePos" />
</template>
<script>
import axios from "axios";
import CreatePositions from "./create-positions.vue";
export default {
  name: "TablePosition",
  components: {
    CreatePositions,
  },
  data() {
    return {
      showFormCreatePos: false,
      items: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(`http://localhost:8081/Pos`);
        this.items = response.data;
      } catch (error) {
        console.error("Error fetchjng data: ", error);
      }
    },
    async deletePosition() {
      const positionId = prompt("Input ID for delete: ");
      if (positionId) {
        try {
          await axios.get("http://localhost:8081/Pos/position/:id", positionId);
          this.fetchData();
        } catch (error) {
          console.error("Error deleting position: ", error);
        }
      }
    },
    async getOnePosition() {
      const getOnePosition = prompt ("Inpet name for search: ");
      if(getOnePosition){
        try{
          const response = await axios.get("http://localhost:8081/Pos/position", getOnePosition);
          this.items = response.data.positions || [];
        } catch(error) {
          console.error ("Error searching for position: ", error);
        }
      }
    },
    async updatePosition() {
      this.fetchData();
    }
  },
};
</script>
<style src="../../assets/style.css"></style>
