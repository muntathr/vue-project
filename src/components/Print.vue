<template>
    <div class="print-content">
        <div class="d-flex justify-content-center mb-4">
            <img src="../assets/images/bg.jpg" alt="logo"/>
        </div>
        <h2>Open Tasks</h2>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Color</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="task in data?.projects?.tasks_open" :key="task.id">
                    <td>{{ task.id }}</td>
                    <td>{{ task.name }}</td>
                    <td>{{ task.status }}</td>
                    <td :style="{ backgroundColor: task.color }">{{ task.color }}</td>
                </tr>
            </tbody>
        </table>

        <h2>Progress Tasks</h2>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Color</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="task in data?.projects?.tasks_progress" :key="task.id">
                    <td>{{ task.id }}</td>
                    <td>{{ task.name }}</td>
                    <td>{{ task.status }}</td>
                    <td :style="{ backgroundColor: task.color }">{{ task.color }}</td>
                </tr>
            </tbody>
        </table>

        <h2>Complete Tasks</h2>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Color</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="task in data?.projects?.tasks_complete" :key="task.id">
                    <td>{{ task.id }}</td>
                    <td>{{ task.name }}</td>
                    <td>{{ task.status }}</td>
                    <td :style="{ backgroundColor: task.color }">{{ task.color }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
import { watch } from 'vue';
import { useClickPhaseStore, useProjectStore } from '../stores/todo';

export default {
    name: 'Print',
    data() {
        return {
            data: null
        }
    },
    setup() {
        const projectStore = useProjectStore();

        // Call the initialization method
        const clickPhaseStore = useClickPhaseStore();
        console.log('clickPhaseStore', clickPhaseStore);
        return {
            clickPhaseStore,
            projectStore
        };
    },
    created() {
        watch(this.projectStore, () => {
            if (this.data == null) {
                this.data = this.clickPhaseStore
            }
            else {
                let newData = localStorage.getItem('data');
                this.data = newData
                console.log('newData', this.clickPhaseStore)
            }
            console.log('watch', this.clickPhaseStore)
        })
    },
};
</script>
  