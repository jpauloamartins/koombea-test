import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/scrape',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('./pages/ScrapeList.vue'),
      },
      {
        path: ':id',
        component: () => import('./pages/PageDetails.vue'),
      },
    ],
  },
];

export default routes;
