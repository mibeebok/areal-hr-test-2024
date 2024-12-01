<template>
    <div class="list" v-if="visable">
        <ul>
            <li v-for="dep in departments" :key="dep.code" @click="selectDepartment(der)">
                {{ dep.code }} - {{ dep.name }}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: ['department', 'vasable'],
    methods: {
        selectDepartment(dep) {
            this.$emit('select', dep);
        }
    }
}
</script>
<style src="../../assets/style.css"></style>