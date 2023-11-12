<script setup>
import AppHeader from './components/AppHeader.vue';
import AppContent from './components/AppContent.vue';
import 'bootstrap'


</script>

<template class="container">
  <div class="row w-100">
    <div class="col-12 col-md-3 col-xl-2">
      <AppHeader />
    </div>
    <div class="col-12 col-md-9 col-xl-10">
      <div class="mx-5">
        <AppContent />
      </div>
    </div>
  </div>
</template>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
@import './assets//styles/modules/app.module.scss';
@import './assets//styles/modules/button.module.scss';
@import './assets//styles/modules/modal.module.scss';
@import './assets//styles/modules/title.module.scss';
@import './assets//styles/modules/todoItem.module.scss';
@import './assets/styles/style.css';
</style>
