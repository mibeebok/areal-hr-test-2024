<template>
  <div class="container1">
    <h2>Управление сотрудниками организаций</h2>
    
    <div class="button-container">
      <div class="button">
        <button>ОРГАНИЗАЦИЯ</button>
      </div>
        <div class="button">
          <button @click="showDepartment = !showDepartment">ОТДЕЛ</button>
          <tableDepartment v-if="showDepartment"/>
        </div>
        <div class="button">
          <button>ДОЛЖНОСТЬ</button>
        </div>
        <div class="button">
          <button>СОТРУДНИКИ</button>
        </div>
        <div class="button">
          <button>ФАЙЛЫ</button>
        </div>
        <div class="button">
          <button>ИСТОРИЯ ИЗМЕНЕНИЙ</button>
        </div>
        <div class="button">
          <button>ПЕРСОНАЛЬНЫЕ ОПЕРАЦИИ</button>
        </div>
    </div>
  </div>
</template>

<script>
  import tableDepartment from './modules/department/table-department.vue';

  export default {
    name: 'App',
    components: {
      tableDepartment,
    },
    data() {
      return {
        showComponent: false,
      }
    }
  }
</script>

<style src="./assets/style.css">
</style>
