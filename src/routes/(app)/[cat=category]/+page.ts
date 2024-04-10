import { api } from '$lib/api.js';

export async function load({ fetch, parent, params }) {
  const { queryClient } = await parent();
    queryClient.prefetchQuery({
      queryKey: ['ads', params.cat],
      queryFn: () => api(fetch).getAdsByCategory(params.cat),
    })

    const response =  await fetch('/translate')
    const translation = response.json()
    return { translation }
}
