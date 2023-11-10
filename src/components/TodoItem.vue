<template>
    <div class="item" :style="{ backgroundColor: todo.color }">
        <div class="todoDetails">
            <div class="texts">
                <p>
                    {{ todo.name }}
                </p>
            </div>
        </div>
        <div class="todoActions">
            <p class="time">{{ formatDate }}</p>
            <div class="d-flex align-items-center">
                <div class="icon" @click="handleDelete" role="button">
                    delete
                </div>
                <span class="mx-2"></span>
                <div class="icon" @click="handleUpdate" role="button">
                    Edit
                </div>
                <span class="mx-2"></span>
                <CheckButton :checked="checked" @handleCheck="handleCheck" />
            </div>
        </div>
    </div>
</template>
  
<script>
import { ref, watch } from 'vue';
import { format } from 'date-fns';
import CheckButton from './CheckButton.vue';
import TodoModal from './TodoModal.vue';

export default {
    props: {
        todo: Object
    },
    components: {
        CheckButton,
        TodoModal
    },
    setup(props) {
        const checked = ref(false);
        const updateModalOpen = ref(false);

        const formatDate = format(new Date(props.todo.time), 'p, MM/dd/yyyy');

        const handleCheck = () => {
            checked.value = !checked.value;
            const status = checked.value ? 'complete' : 'incomplete';
            updateTodoStatus({ ...props.todo, status });
        };

        const handleDelete = () => {
            deleteTodo(props.todo.id);
            console.log("error tost")
        };

        const handleUpdate = () => {
            updateModalOpen.value = true;
        };

        watch(
            () => props.todo.status,
            () => {
                checked.value = props.todo.status === 'complete';
            }
        );

        const updateTodoStatus = (updatedTodo) => {
            // Simulating API call or any external logic to update the todo status
            // Example: In a real app, you might send a request to update the status of the todo.
            console.log("Updating todo status:", updatedTodo);
        };

        const deleteTodo = (todoId) => {
            // Simulating API call or any external logic to delete the todo
            // Example: In a real app, you might send a request to delete the todo.
            console.log("Deleting todo with ID:", todoId);
        };

        const setUpdateModalOpen = (value) => {
            updateModalOpen.value = value;
        };

        return {
            checked,
            updateModalOpen,
            formatDate,
            handleCheck,
            handleDelete,
            handleUpdate,
            setUpdateModalOpen
        };
    }
};
</script>
  
<style scoped>
/* Add scoped styles here */
</style>
