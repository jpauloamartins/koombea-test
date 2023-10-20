<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="fit flex flex-center column">
        <q-img
          class="q-mb-md"
          src="~assets/koombea.jpg"
          width="300px"
          no-spinner
          no-transition
        />
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AuthLayout',

  data() {
    return {};
  },
});
</script>
