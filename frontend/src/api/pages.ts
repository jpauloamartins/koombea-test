import { api } from '@boot/axios';

export async function getPages(skip?: number, take?: number) {
  const response = await api.get('pages', {
    params: { skip, take },
  });

  return response.data;
}

export async function getPage(id: string) {
  const response = await api.get(`pages/${id}`);

  return response.data;
}

export async function scrapePage(url: string) {
  const response = await api.post('pages', { url });

  return response.data;
}
