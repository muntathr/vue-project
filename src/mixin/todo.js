// todoMixin.js

import { reactive } from 'vue';

const todoMixin = () => {
  const data = reactive({
    todoItem: null, // Initialize with null or any default value
    // Add other reactive properties
  });

  const setDataTodo = (todo) => {
    data.todoItem = todo;
  };

  return {
    data,
    setDataTodo,
    // Add other methods or properties if needed
  };
};

export default todoMixin;
