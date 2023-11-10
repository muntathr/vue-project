<template>
    <p class="title" v-bind="$attrs">
        <slot></slot>
    </p>
</template>
  
<script>
export default {
    name: 'PageTitle'
};
</script>
  
<style scoped></style>
  