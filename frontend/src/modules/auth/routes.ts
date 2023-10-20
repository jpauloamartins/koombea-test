import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('./pages/SignIn.vue'),
      },
      {
        path: 'sign-up',
        component: () => import('./pages/SignUp.vue'),
      },
    ],
  },
];

export default routes;
