<template>
    <div class="list" v-if="visible">
      <ul>
        <li v-for="org in organizations" :key="org.code" @click="selectOrganization(org)">
          {{ org.code }} - {{ org.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: ['organizations', 'visible'],
    methods: {
      selectOrganization(org) {
        this.$emit('select', org);
      }
    }
  };
  </script>
  
  <style src="../../assets/style.css">
  </style>
  