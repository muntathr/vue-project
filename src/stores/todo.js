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
            if (this.projects[0]?.project?.phases[phaseIndex]?.tasks_open) {
                this.projects[0].project.phases[phaseIndex].tasks_open.push(newTask);
                localStorage.setItem('data', JSON.stringify(this.projects));
            } else {
                console.error('Tasks array is not properly initialized for the phase');
            }
        },
        getters: {
            getProjects() {
                return this.projects;
            }
        }
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
        getPhases() {
            return this.projects;
        }
    }
});

export const useUpdateStore = defineStore({
    id: 'update',
    state: () => ({
        num: null,
    }),
    actions: {
        clickUpdate(num) {
            this.num = num;
            console.log('update', num);
        },
    },
    getters: {
        getUpdate() {
            return this.num;
        }
    }
});