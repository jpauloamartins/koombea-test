import { api } from '@boot/axios';

export interface SignInData {
  email: string;
  password: string;
}

export async function signIn(signIn: SignInData) {
  const response = await api.post('users/sign-in', signIn);

  return response.data;
}

export async function signUp(signUp: SignInData) {
  const response = await api.post('users/sign-up', signUp);

  return response.data;
}
