<template>
    <div class="container2">
        <p class="title2">Отделы</p>
        <div class="parent-container">
            <table>
                <thead>
                    <tr>
                    <th>Номер записи</th>
                    <th>Организация</th>
                    <th>Родительский отдел</th>
                    <th>Название</th>
                    <th>Комментарий</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{ item.id_organization }}</td>
                    <td>{{item.parent}}</td>
                    <td>{{ item.name }}</td>
                    <td>{{item.comment}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <button>Добавить запись</button>
            <button>Удалить запись</button>
            <button>Поиск записи</button>
            <button>Обновить таблицу</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default{
    name: 'tableDepartment',
    data(){
        return{
            items: []
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const response = await axios.get(`http://localhost:8080/Dep`);
                this.items = response.data;
            }catch (error){
                console.error('Error fetchong data: ', error);
            }
        }
    }
}
</script>
<style src = "../../assets/style.css">
</style>