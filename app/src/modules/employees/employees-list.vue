<template>
    <div class="list" v-if="visible">
      <ul>
        <li v-for="empl in employees" :key="empl.code" @click="selectEmployees(org)">
          {{ empl.code }} - {{ empl.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: ['employees', 'visible'],
    methods: {
      selectEmployees(empl) {
        this.$emit('select', empl);
      }
    }
  };
  </script>
  
  <style src="../../assets/style.css">
  </style>