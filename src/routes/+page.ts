import { api } from "$lib/api";

export async function load({ parent, fetch, params, route }) {
  const { queryClient } = await parent();

  // Cachowanie danych dla 'sales'
  await queryClient.prefetchQuery({
    queryKey: ['ads', route.id],
    queryFn: () => api(fetch).getAdsByCategory('rental')
  });
}