import { defineStore } from 'pinia';
import jsonFile from '../assets/json/data.json'
export const useProjectStore = defineStore({
    id: 'project',
    state: () => ({
        projects: [],
    }),
    actions: {
        setDefaultData() {
            const dataFromLocalStorage = localStorage.getItem('data');
            if (dataFromLocalStorage) {
                this.projects = JSON.parse(dataFromLocalStorage);
            } else {
                this.projects = jsonFile
                localStorage.setItem('data', JSON.stringify(this.projects));
            }
        },
        addTask(phaseIndex, newTask) {
            console.log('new task', newTask)
            if (this.projects[0]?.project?.phases[phaseIndex]?.tasks) {
                this.projects[0].project.phases[phaseIndex].tasks.push(newTask);
                localStorage.setItem('data', JSON.stringify(this.projects));
            } else {
                console.error('Tasks array is not properly initialized for the phase');
            }
        },
        // Other actions...
    },
});


export const useClickPhaseStore = defineStore({
    id: 'phase',
    state: () => ({
        projects: null,
    }),
    actions: {
        clickPhase(project) {
            this.projects = project;
            console.log(project)
        },
    },
    getters: {
        getProjects() {
            return this.projects;
        }
    }
});