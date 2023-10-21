<template>
  <q-page class="q-pa-lg flex justify-center">
    <div id="page-details" class="q-col-gutter-md">
      <div class="q-col-gutter-md flex items-center no-wrap">
        <div>
          <q-btn
            icon="arrow_back"
            color="primary"
            round
            unelevated
            @click="$router.push('/scrape')"
          />
        </div>
        <div class="text-h6 text-bold">
          {{ page.data?.title || page.data?.url }}
        </div>
      </div>
      <q-table
        color="primary"
        :columns="columns"
        :rows="page.data?.links"
        flat
        :loading="page.loading"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { QTableProps } from 'quasar';

import { getPage } from '@api/pages';
import { IPage } from '@models/IPage';

export default defineComponent({
  name: 'PageDetails',

  data() {
    return {
      page: {
        data: null as IPage | null,
        loading: false,
      },
    };
  },

  computed: {
    columns(): QTableProps['columns'] {
      return [
        {
          name: 'label',
          field: 'label',
          label: 'Label',
          align: 'left',
        },
        {
          name: 'url',
          field: 'url',
          label: 'URL',
          align: 'left',
        },
      ];
    },
  },

  created() {
    this.loadPage();
  },

  methods: {
    async loadPage() {
      try {
        const { id } = this.$route.params;

        if (!id) {
          this.$router.push('/scrape');
        }

        this.page.loading = true;
        this.page.data = await getPage(id as string);
      } finally {
        this.page.loading = false;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
#page-details {
  width: 600px;
  max-width: 100%;
}
</style>
