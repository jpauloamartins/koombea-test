import { defineStore } from 'pinia';
import jwtDecode from 'jwt-decode';

import { IUser } from '@models/IUser';

interface ITokenData {
  accessToken: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as IUser | null,
  }),

  actions: {
    authUser(tokenData: ITokenData) {
      const user = jwtDecode<IUser>(tokenData.accessToken);

      this.user = user;
    },
  },
});
