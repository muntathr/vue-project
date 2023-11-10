<template>
    <select :id="id" :class="[styles.button, styles.button__select]" v-bind="$attrs">
        <slot></slot>
    </select>
</template>
  
<script>
import styles from '../styles/modules/button.module.scss';

export default {
    props: {
        id: String
    }
};
</script>
  