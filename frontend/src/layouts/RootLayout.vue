<template>
  <router-view v-if="loaded" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'pinia';

import { useUserStore } from '@stores/userStore';

export default defineComponent({
  name: 'App',

  data() {
    return {
      loaded: false,
    };
  },

  async mounted() {
    try {
      const user = await this.autoSignIn();

      if (!user) {
        this.$router.push('/');
      }
    } finally {
      this.loaded = true;
    }
  },

  methods: {
    ...mapActions(useUserStore, [
      'autoSignIn',
    ]),
  },
});
</script>
