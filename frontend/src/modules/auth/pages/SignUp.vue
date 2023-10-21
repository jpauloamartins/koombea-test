<template>
  <div class="sign-in">
    <q-card>
      <v-form v-slot="{ handleSubmit, isSubmitting }">
        <q-card-section>
          <q-form
            class="q-col-gutter-md"
            @submit="handleSubmit(signUp)"
          >
            <div class="text-h5 text-bold">
              Sign Up
            </div>
            <div>
              <v-field
                v-slot="{ field, handleChange, errorMessage }"
                label="Email"
                name="email"
                rules="required|email"
              >
                <q-input
                  label="Email"
                  type="email"
                  outlined
                  autofocus
                  :model-value="field.value"
                  :error="Boolean(errorMessage)"
                  :error-message="errorMessage"
                  @update:model-value="handleChange"
                />
              </v-field>
            </div>
            <div>
              <v-field
                v-slot="{ field, handleChange, errorMessage }"
                label="Password"
                name="password"
                rules="required"
              >
                <q-input
                  label="Password"
                  type="password"
                  outlined
                  :model-value="field.value"
                  :error="Boolean(errorMessage)"
                  :error-message="errorMessage"
                  @update:model-value="handleChange"
                />
              </v-field>
            </div>
            <div>
              <q-btn
                type="submit"
                class="full-width"
                color="primary"
                label="Sign Up"
                unelevated
                no-caps
                :loading="isSubmitting"
              />
            </div>
          </q-form>
        </q-card-section>
      </v-form>
    </q-card>
    <div class="q-pt-sm text-bold">
      Already have an account?
      <router-link to="/">Sign in here</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Form, Field } from 'vee-validate';
import { mapActions } from 'pinia';

import { SignInData, signUp } from '@api/users';
import { useUserStore } from '@stores/userStore';

export default defineComponent({
  name: 'SignUp',

  components: {
    VForm: Form,
    VField: Field,
  },

  methods: {
    ...mapActions(useUserStore, ['authUser']),

    async signUp(formData: unknown) {
      try {
        const response = await signUp(formData as SignInData);

        await this.authUser(response);

        this.$router.push('/scrape');
      } catch {
        this.$q.notify({
          type: 'negative',
          message: 'An error ocurred while signing up.',
        });
      }
    },
  },
});
</script>

<style lang="scss">
.sign-in {
  width: 100%;
  max-width: 400px;
}

.q-card {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
</style>
