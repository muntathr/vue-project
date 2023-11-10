<template>
  <div :class="['svgBox', checked ? 'checked' : 'unchecked']" @click="handleCheck" :style="{
    background: checked ? 'var(--primaryPurple)' : 'var(--gray-2)',
    transition: 'background 0.1s'
  }">
    <svg class="svg" xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 53 38">
      <path :style="{
        pathLength,
        opacity
      }" fill="none" stroke-miterlimit="10" stroke-width="6" :d="`M1.5 22L16 36.5L51.5 1`" stroke-linejoin="round"
        stroke-linecap="round"></path>
    </svg>
  </div>
</template>

<script>
import { ref, watch, onMounted } from "vue";

export default {
  props: {
    checked: Boolean,
  },
  setup(props, { emit }) {
    const pathLength = ref(1);
    const opacity = ref(1);

    watch(
      () => props.checked,
      () => {
        // Animate path length and opacity when checked status changes
        if (props.checked) {
          pathLength.value = 1;
          opacity.value = 1;
        } else {
          pathLength.value = 0;
          opacity.value = 0;
        }
      }
    );

    const handleCheck = () => {
      emit("handleCheck");
    };

    return {
      pathLength,
      opacity,
      handleCheck,
    };
  },
};
</script>

<style scoped>
.svgBox {
  width: 53px;
  height: 38px;
  cursor: pointer;
}

.svg {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
