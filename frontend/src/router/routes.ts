import { RouteRecordRaw } from 'vue-router';

import authRoutes from '@modules/auth/routes';
import scrapeRoutes from '@modules/scrape/routes';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@layouts/RootLayout.vue'),
    children: [
      ...authRoutes,
      ...scrapeRoutes,
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
