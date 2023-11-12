<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="exampleModalLabel">Task</h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="handleSubmit">
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="title" class="form-label">Title</label>
                            <input type="text" id="title" class="form-control" v-model="title" />
                        </div>
                        <div class="mb-3">
                            <label for="type" class="form-label">Status</label>
                            <select id="type" ref="titleInput" v-model="status" class="form-select">
                                <option value="incomplete">Incomplete</option>
                                <option value="complete">Completed</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="color" class="form-label">Color</label>
                            <div class="d-flex justify-content-between">
                                <button @click="setColor('#dfe6e9')" class="buttonColor" :style="{
                                    backgroundColor: '#dfe6e9',
                                    border: this.color === '#dfe6e9' ? '2px solid' : 'none',
                                }"></button>
                                <button @click="setColor('#3F51B5')" class="buttonColor" :style="{
                                    backgroundColor: '#3F51B5',
                                    border: this.color === '#3F51B5' ? '2px solid' : 'none',
                                }"></button>
                                <button @click="setColor('#E91E63')" class="buttonColor" :style="{
                                    backgroundColor: '#E91E63',
                                    border: this.color === '#E91E63' ? '2px solid' : 'none',
                                }"></button>
                                <button @click="setColor('#795548')" class="buttonColor" :style="{
                                    backgroundColor: '#795548',
                                    border: this.color === '#795548' ? '2px solid' : 'none',
                                }"></button>
                                <button @click="setColor('#F44336')" class="buttonColor" :style="{
                                    backgroundColor: '#F44336',
                                    border: this.color === '#F44336' ? '2px solid' : 'none',
                                }"></button>
                                <button @click="setColor('#2196F3')" class="buttonColor" :style="{
                                    backgroundColor: '#2196F3',
                                    border: this.color === '#2196F3' ? '2px solid' : 'none',
                                }"></button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" @click="addNewTaskToPhase">
                            {{ type === "add" ? "Add Task" : "Update Task" }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { taskMixin } from "../mixin/todo";
import { useProjectStore } from "../stores/todo";

export default {
    mixins:[taskMixin],
    props: {
        type: String,
        modalOpen: Boolean,
        setModalOpen: Function,
        todo: Object,
    },
    data() {
        return {
            title: "",
            status: "incomplete",
            color: "#dfe6e9",
        };
    },
    methods: {
        setColor(color) {
            this.color = color;
            console.log(this.color);
        },
        addNewTaskToPhase() {
            const newTask = {
                id: Math.random(),
                name: this?.title,
                status: this?.status,
                color: this?.color,
            };
            this.addTask(0, newTask); // Access projectStore using 'this'
        },
    },
    setup() {
        const projectStore = useProjectStore();
        projectStore.setDefaultData(); // Load the default data

        return {
            projectStore,
        };
    },
};
</script>

<style>
/* Add your custom styles here */
</style>
