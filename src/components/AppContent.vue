<template>
    <div v-if="!printing" class="content__wrapper">
        <div class="d-flex justify-content-between">
            <h1 class="titleHeader">My Task</h1>
            <!-- <button type="button" class="btn btn-add-task" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add Task
            </button> -->
            <button v-if="data?.projects?.tasks_open" type="button" class="btn btn-add-task" @click="printPage">
                Print
            </button>
        </div>
        <h2 v-if="data?.projects?.tasks_open" class="font-weight-bold mt-4 mb-1">Open</h2>
        <div v-if="data?.projects?.tasks_open" class="row">
            <div v-for="todo in data?.projects?.tasks_open" :key="todo.id" class="col-12 col-md-6 col-lg-4 col-xl-3">
                <div class="item" :style="{ backgroundColor: todo.color }">
                    <div class="todoDetails">
                        <div class="texts">
                            <h3 class="font-weight-bold">
                                {{ todo.name }}
                            </h3>
                        </div>
                    </div>
                    <div class="todoActions">
                        <p class="time">{{ formatDate }}</p>
                        <div class="d-flex align-items-center">
                            <div class="icon" @click="handleDelete" role="button">
                                <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 -960 960 960"
                                    width="14">
                                    <path
                                        d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                </svg>
                            </div>
                            <span class="mx-2"></span>
                            <div class="icon" role="button">
                                <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 -960 960 960"
                                    width="14">
                                    <path
                                        d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                                </svg>
                            </div>
                            <span class="mx-2"></span>
                            <div class="icon" role="button">
                                <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 -960 960 960"
                                    width="14">
                                    <path
                                        d="M240-640h360v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85h-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640Zm0 480h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM240-160v-400 400Z" />
                                </svg>
                            </div>
                            <span class="mx-2"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h2 v-if="data?.projects?.tasks_progress" class="font-weight-bold mt-4 mb-1">Progress</h2>
        <div v-if="data?.projects?.tasks_progress" class="row">
            <div v-for="todo in data?.projects?.tasks_progress" :key="todo.id" class="col-12 col-md-6 col-lg-4 col-xl-3">
                <div class="item" :style="{ backgroundColor: todo.color }">
                    <div class="todoDetails">
                        <div class="texts">
                            <h3 class="font-weight-bold">
                                {{ todo.name }}
                            </h3>
                        </div>
                    </div>
                    <div class="todoActions">
                        <p class="time">{{ formatDate }}</p>
                        <div class="d-flex align-items-center">
                            <div class="icon" @click="handleDelete" role="button">
                                <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 -960 960 960"
                                    width="14">
                                    <path
                                        d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                </svg>
                            </div>
                            <span class="mx-2"></span>
                            <div class="icon" role="button">
                                <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 -960 960 960"
                                    width="14">
                                    <path
                                        d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                                </svg>
                            </div>
                            <span class="mx-2"></span>
                            <div class="icon" role="button">
                                <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 -960 960 960"
                                    width="14">
                                    <path
                                        d="M240-640h360v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85h-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640Zm0 480h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM240-160v-400 400Z" />
                                </svg>
                            </div>
                            <span class="mx-2"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h2 v-if="data?.projects?.tasks_complete" class="font-weight-bold mt-4 mb-1">Completed</h2>
        <div v-if="data?.projects?.tasks_complete" class="row">
            <div v-for="todo in data?.projects?.tasks_complete" :key="todo.id" class="col-12 col-md-6 col-lg-4 col-xl-3">
                <div class="item" :style="{ backgroundColor: todo.color }">
                    <div class="todoDetails">
                        <div class="texts">
                            <h3 class="font-weight-bold">
                                {{ todo.name }}
                            </h3>
                        </div>
                    </div>
                    <div class="todoActions">
                        <p class="time">{{ formatDate }}</p>
                        <div class="d-flex align-items-center">
                            <div class="icon" @click="handleDelete" role="button">
                                <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 -960 960 960"
                                    width="14">
                                    <path
                                        d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                </svg>
                            </div>
                            <span class="mx-2"></span>
                            <div class="icon" role="button">
                                <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 -960 960 960"
                                    width="14">
                                    <path
                                        d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                                </svg>
                            </div>
                            <span class="mx-2"></span>
                            <div class="icon" role="button">
                                <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 -960 960 960"
                                    width="14">
                                    <path
                                        d="M240-640h360v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85h-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640Zm0 480h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM240-160v-400 400Z" />
                                </svg>
                            </div>
                            <span class="mx-2"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="emptyText" v-if="!loadingTodos" key="noTodos">
            <div ref="lottieContainer"></div>
            <h2 class="font-weight-bold">Select Phase</h2>
            </p>
        </div>
    </div>
    <!-- page Print -->
    <div :class="!printing && 'd-none'">
        <Print />
    </div>

    <TodoModal :addTask="addTask" />
</template>

<script>
import Lottie from 'lottie-web';
import animNodata from '../assets/animation/no-data.json';
import TodoModal from './TodoModal.vue';
import { useClickPhaseStore, useProjectStore } from '../stores/todo';
import { watch } from 'vue';
import Print from './Print.vue';
import { taskMixin } from '../mixin/todo';

export default {
    mixins: [taskMixin],
    data() {
        return {
            printing: false,
            tasks: null,
        };
    },
    components: {
        TodoModal,
        Print,
    },
    mounted() {
        this.initLottieAnimation();
    },
    methods: {
        printPage() {
            this.printing = true;
            setTimeout(() => {
                window.print();
            }, 100);
            setTimeout(() => {
                this.printing = false;
            }, 200);
        },
        initLottieAnimation() {
            const container = this.$refs.lottieContainer;

            if (container) {
                Lottie.loadAnimation({
                    container: container,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    animationData: animNodata,
                });
            }
        },
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
        const dataJson = localStorage.getItem('data');
        watch(() => dataJson, () => {
            console.log('newValue');
            console.log('oldValue');
        });
    }
};
</script>
