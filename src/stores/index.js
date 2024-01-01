// store.js
import { createPinia, defineStore } from 'pinia';

const pinia = createPinia();

export const useTaskStore = defineStore('task', {
    state: () => ({
        projects: [],
    }),
    actions: {
        addProject(projectName) {
            this.projects.push({
                name: projectName,
                phases: [],
            });
        },
        addPhase(projectIndex, phaseName) {
            this.projects[projectIndex].phases.push({
                name: phaseName,
                tasks: [],
            });
        },
        addTask(projectIndex, phaseIndex, taskName) {
            this.projects[projectIndex].phases[phaseIndex].tasks.push({
                name: taskName,
                status: 'open',
            });
        },
        updateTaskStatus(projectIndex, phaseIndex, taskIndex, newStatus) {
            console.log(projectIndex, phaseIndex, taskIndex, newStatus)
            this.projects[projectIndex].phases[phaseIndex].tasks[taskIndex].status = newStatus;
        },
    },
    getters: {
        getProjects: (state) => state.projects,
    },
});

export { pinia };
