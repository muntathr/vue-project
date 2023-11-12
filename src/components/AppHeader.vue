<template>
    <div class="appHeader">
        <div class="d-flex align-item-center">
            <img class="mt-4 pt-1" src="../assets/images/aswar.jpg" alt="logo" />
            <h1>Task Manager</h1>
        </div>
        <Button v-for="project in data" :key="project.project.id" variant="primary">
            <div @click="setSliderBarOpen(project.project.id)"
                :class="[sliderBarOpen === project.project.id ? 'btn-slidbar active' : 'btn-slidbar']">
                <span class="d-flex">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path
                            d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z" />
                    </svg>
                    <h4>
                        {{ project.project.titleProject }}
                    </h4>
                </span>
                <span :class="[sliderBarOpen === project.project.id ? 'btn-down rotate' : 'btn-down']">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
                    </svg>
                </span>
            </div>
            <div v-for="phase in project.project.phases" :key="phase.id"
                @click="setSliderBarOpenPaese(phase.id) + clickPhase({tasks_open: phase.tasks_open})"
                :class="[sliderBarOpen === project.project.id ? 'btn-slidbar phese' : 'd-none', sliderBarOpenPaese === phase.id ? 'active' : '']">
                <span class="d-flex">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path
                            d="m656-120-56-56 63-64-63-63 56-57 64 64 63-64 57 57-64 63 64 64-57 56-63-63-64 63Zm-416-80q17 0 28.5-11.5T280-240q0-17-11.5-28.5T240-280q-17 0-28.5 11.5T200-240q0 17 11.5 28.5T240-200Zm0 80q-50 0-85-35t-35-85q0-50 35-85t85-35q37 0 67.5 20.5T352-284q39-11 63.5-43t24.5-73v-160q0-83 58.5-141.5T640-760h46l-63-63 57-57 160 160-160 160-57-56 63-64h-46q-50 0-85 35t-35 85v160q0 73-47 128.5T354-203q-12 37-43.5 60T240-120Zm-64-480-56-56 63-64-63-63 56-57 64 64 63-64 57 57-64 63 64 64-57 56-63-63-64 63Z" />
                    </svg>
                    <h4>
                        {{ phase.title }}
                    </h4>
                </span>
                <span></span>
            </div>
            <div :class="[sliderBarOpen === project.project.id ? 'slidebar-add-phase' : 'd-none']">
                <input class="slidebar-add-phase" placeholder="+ Add Phase" v-model="newPhaseTitle" />
                <button :class="[newPhaseTitle.length > 0 ? '' : 'd-none']" @click="addPhase(project.project.id)">+</button>
            </div>
        </Button>
        <div class="slidebar-add-project">
            <input placeholder="+ Add Project" v-model="newProjectTitle" />
            <button :class="[newProjectTitle.length > 0 ? '' : 'd-none']" @click="addProject">+</button>
        </div>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import jsonDataApi from '../assets/json/data.json';
import Button from './Button.vue'; // Import your Button component
import { useClickPhaseStore } from '../stores/todo';

export default {
    data() {
        return {
            sliderBarOpen: 0,
            sliderBarOpenPaese: 0,
            newProjectTitle: '',
            newPhaseTitle: '',
            data: JSON.parse(localStorage.getItem('data')) || jsonDataApi,
        };
    },
    components: {
        Button,
    },
    methods: {
        // function active parse
        setSliderBarOpenPaese(open) {
            this.sliderBarOpenPaese = open;
            console.log(open);
        },
        setSliderBarOpen(open) {
            if (this.sliderBarOpen == open) {
                this.sliderBarOpen = 0;
            }
            else {
                this.sliderBarOpen = open;
            }

            console.log(open);
            this.setSliderBarOpenPaese(0)
        },
        // function Add Project
        addProject() {
            if (this.newProjectTitle.trim() !== '') {
                const newProject = {
                    project: {
                        id: Math.random(),
                        titleProject: this.newProjectTitle,
                        phases: [],
                    },
                };
                this.data.push(newProject);
                this.newProjectTitle = '';
                localStorage.setItem('data', JSON.stringify(this.data)); // Save to localStorage
            }
        },

        // function Add phase
        addPhase(projectId) {
            const projectIndex = this.data.findIndex((project) => project.project.id === projectId);
            if (projectIndex > -1 && this.newPhaseTitle.trim() !== '') {
                this.data[projectIndex].project.phases.push({
                    id: Math.random(), // Generate a unique ID for the phase
                    title: this.newPhaseTitle,
                    // Other phase properties...
                });
                this.newPhaseTitle = '';
                localStorage.setItem('data', JSON.stringify(this.data)); // Save to localStorage
            }
        },
    },
    setup() {
        const phaseStore = useClickPhaseStore();
        const phases = phaseStore.projects;
        const clickPhase = (data) => {
            console.log('click',JSON.stringify(data))
            phaseStore.clickPhase(data);
        }
        return {
            phases,
            clickPhase
        };

    }
};
</script>
