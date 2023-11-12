export const taskMixin = {
  data() {
    return {
      data: null,
    };
  },
  methods: {
    addTask(phaseIndex, newTask) {
      this.projectStore.addTask(phaseIndex, newTask);
      let newData = JSON.parse(localStorage.getItem('data'));
      let parseNewData = newData[0].project.phases[0];
      this.data = parseNewData;
      console.log('stringify', JSON.stringify(newData[0].project.phases[0]));
    },
  },
  setup() {
    const projectStore = useProjectStore();
    const clickPhaseStore = useClickPhaseStore();
    console.log('clickPhaseStore', clickPhaseStore);
    return {
      clickPhaseStore,
      projectStore,
      data: ref(null), // expose data as a ref
    };
  },
  created() {
    if (this.data == null) {
      this.data = this.clickPhaseStore;
    }
  },
};
