<template>
  <q-page class="q-pa-lg flex justify-center">
    <div id="scrape-list" class="q-col-gutter-md">
      <v-form v-slot="{ handleSubmit, isSubmitting }">
        <q-form
          class="q-col-gutter-md flex"
          @submit="handleSubmit(scrapePage)"
        >
          <v-field
            v-slot="{ field, handleChange, errorMessage }"
            label="URL"
            name="url"
            rules="required|url"
          >
            <q-input
              class="col-grow"
              label="URL"
              type="url"
              outlined
              dense
              autofocus
              :model-value="field.value"
              :error="Boolean(errorMessage)"
              :error-message="errorMessage"
              @update:model-value="handleChange"
            />
          </v-field>
          <div>
            <q-btn
              type="submit"
              label="Scrape"
              color="primary"
              unelevated
              :loading="isSubmitting"
            />
          </div>
        </q-form>
      </v-form>
      <div>
        <q-table
          color="primary"
          :columns="columns"
          :rows="pages.data"
          flat
          :loading="pages.loading"
          @row-click="openRow"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Form, Field } from 'vee-validate';
import { QTableProps } from 'quasar';

import { getPages, scrapePage } from '@api/pages';
import { IPage } from '@models/IPage';

export default defineComponent({
  name: 'ScrapeList',

  components: {
    VForm: Form,
    VField: Field,
  },

  data() {
    return {
      pages: {
        data: [] as IPage[],
        loading: false,
      },
    };
  },

  computed: {
    columns(): QTableProps['columns'] {
      return [
        {
          name: 'title',
          field: 'title',
          format: (title: string, row: IPage) => {
            return title || row.url;
          },
          label: 'Title',
          align: 'left',
        },
        {
          name: 'status',
          field: 'status',
          label: 'Status',
          align: 'left',
        },
        {
          name: 'linksCount',
          field: 'linksCount',
          label: 'Total links',
        },
      ];
    },
  },

  created() {
    this.loadPages();
  },

  methods: {
    async loadPages() {
      try {
        this.pages.loading = true;
        this.pages.data = await getPages();
      } finally {
        this.pages.loading = false;
      }
    },

    async scrapePage(formData: unknown) {
      const { url } = formData as { url: string };

      const page = await scrapePage(url);

      this.pages.data.push(page);
    },

    openRow(event: unknown, page: IPage) {
      this.$router.push(`/scrape/${page.id}`);
    },
  },
});
</script>

<style lang="scss" scoped>
#scrape-list {
  width: 600px;
  max-width: 100%;
}
</style>
