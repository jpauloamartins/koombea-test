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
          v-model:pagination="pagination"
          @request="loadPages"
          @row-click="openRow"
        >
          <template #body-cell-status="props">
            <q-td>
              <q-spinner
                v-if="props.value === 'SCRAPING'"
                color="primary"
                size="sm"
              />
              <q-icon
                v-else-if="props.value === 'SCRAPED'"
                name="check_circle"
                color="positive"
                size="sm"
              />
              <q-icon
                v-else
                name="cancel"
                color="negative"
                size="sm"
              />
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Form, Field } from 'vee-validate';
import { QTableProps } from 'quasar';
import { pathOr } from 'ramda';

import { getPages, scrapePage } from '@api/pages';
import { IPage } from '@models/IPage';

const DEFAULT_PAGINATION = {
  page: 1,
  rowsPerPage: 5,
  rowsNumber: 0,
};

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
      pagination: DEFAULT_PAGINATION,
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
    async loadPages(params?: { pagination: QTableProps['pagination'] }) {
      const pagination = pathOr(DEFAULT_PAGINATION, ['pagination'], params);

      this.pagination = pagination;

      const take = pathOr(5, ['rowsPerPage'], pagination);
      const skip = (pathOr(1, ['page'], pagination) - 1) * take;

      try {
        this.pages.loading = true;

        const { rows, total } = await getPages(skip, take);

        this.pages.data = rows;
        this.pagination.rowsNumber = total;
      } finally {
        this.pages.loading = false;
      }
    },

    async scrapePage(formData: unknown) {
      const { url } = formData as { url: string };

      const page = await scrapePage(url);

      this.pages.data.push(page);
      this.pagination.rowsNumber += 1;
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
