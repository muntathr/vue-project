<template>
    <button class="d-block border" :type="type === 'submit' ? 'submit' : 'button'"
        v-bind="$attrs" @click="$emit('click')">
        <slot></slot>
    </button>
</template>
  
<script>

const buttonTypes = {
    primary: 'primary',
    secondary: 'secondary',
};

export default {
    props: {
        type: String,
        variant: {
            type: String,
            default: 'primary'
        },
        status: String
    },
};
</script>
  