import { defineRule, configure } from 'vee-validate';
import {
  url,
  email,
  required,
} from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';

import en from '@vee-validate/i18n/dist/locale/en.json';

defineRule('url', url);
defineRule('email', email);
defineRule('required', required);

configure({
  generateMessage: localize({
    'en-US': en,
  }),
});
