<!-- App.vue -->
<template>
  <div>
    <h1>Task Management</h1>
    <div>
      <label>Project Name:</label>
      <input v-model="projectName" />
      <button @click="addProject">Add Project</button>
    </div>
    <div v-for="(project, projectIndex) in projects" :key="projectIndex">
      <h2 @click="selectProject(projectIndex)">{{ project.name }}</h2>
      <div>
        <label>Phase Name:</label>
        <input v-model="phaseName" />
        <button @click="addPhase(projectIndex)">Add Phase</button>
      </div>
      <div v-for="(phase, phaseIndex) in project.phases" :key="phaseIndex">
        <h3 @click="selectPhase(projectIndex, phaseIndex)">{{ phase.name }}</h3>
        <div>
          <label>Task Name:</label>
          <input v-model="taskName" />
          <button @click="addTask(projectIndex, phaseIndex)">Add Task</button>
        </div>
        <ul>
          <li v-for="(task, taskIndex) in phase.tasks" :key="taskIndex">
            {{ task.name }} - Status: {{ task.status }}
            <button @click="updateTaskStatus(projectIndex, phaseIndex, taskIndex, 'in progress')">Start</button>
            <button @click="updateTaskStatus(projectIndex, phaseIndex, taskIndex, 'complete')">Complete</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useTaskStore } from './stores/index';

export default {
  setup() {
    const projectName = ref('');
    const phaseName = ref('');
    const taskName = ref('');

    const addProject = () => {
      if (projectName.value) {
        useTaskStore().addProject(projectName.value);
        projectName.value = '';
      }
    };

    const addPhase = (projectIndex) => {
      if (phaseName.value) {
        useTaskStore().addPhase(projectIndex, phaseName.value);
        phaseName.value = '';
      }
    };

    const addTask = (projectIndex, phaseIndex) => {
      if (taskName.value) {
        useTaskStore().addTask(projectIndex, phaseIndex, taskName.value);
        taskName.value = '';
      }
    };

    const updateTaskStatus = (projectIndex, phaseIndex, taskIndex, newStatus) => {
      useTaskStore().updateTaskStatus(projectIndex, phaseIndex, taskIndex, newStatus);
    };

    const selectProject = (projectIndex) => {
      useTaskStore().selectProject(useTaskStore().getProjects[projectIndex]);
    };

    const selectPhase = (projectIndex, phaseIndex) => {
      const project = useTaskStore().getProjects[projectIndex];
      useTaskStore().selectPhase(project ? project.phases[phaseIndex] : null);
    };

    const projects = useTaskStore().getProjects;

    return {
      projectName,
      phaseName,
      taskName,
      projects,
      addProject,
      addPhase,
      addTask,
      updateTaskStatus,
      selectProject,
      selectPhase,
    };
  },
};
</script>
