<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white">
      <q-img
        src="~assets/koombea.jpg"
        height="64px"
        fit="contain"
        no-spinner
        no-transition
      />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
});
</script>
