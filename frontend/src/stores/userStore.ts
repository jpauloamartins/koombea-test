import { defineStore } from 'pinia';
import jwtDecode from 'jwt-decode';

import { IUser } from '@models/IUser';
import { setToken } from '@boot/axios';

const TOKEN_KEY = 'ut';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as IUser | null,
  }),

  actions: {
    authUser(token: string) {
      const user = jwtDecode<IUser>(token);

      setToken(token);
      localStorage.setItem(TOKEN_KEY, token);
      this.user = user;

      return user;
    },

    autoSignIn() {
      const token = localStorage.getItem(TOKEN_KEY);

      if (token) {
        return this.authUser(token);
      }
    },
  },
});
