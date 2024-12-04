<template>
    <div class="position-list" v-if="visable">
        <ul>
            <li v-for="pos in positions" :key="pos.code" @click="selectPosition(pos)">
                {{ pos.code }} - {{ pos.name }}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: ['positions', 'visable'],
    methods: {
        selectPosition(pos) {
            this.$emit ('select', pos);
        }
    }
}
</script>
<style src="../../assets/style.css"></style>