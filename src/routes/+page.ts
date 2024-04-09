import { api } from '$lib/api.js';

export async function load({ fetch, parent }) {
  const { queryClient } = await parent();
  const categories = ['sales', 'rental']; // Tutaj dodajemy wszystkie potrzebne kategorie

  // Iteracja przez wszystkie kategorie i cachowanie danych dla każdej z nich
  await Promise.all(categories.map(category => 
    queryClient.prefetchQuery({
      queryKey: ['ads', category],
      queryFn: () => api(fetch).getAdsByCategory(category),
    })
  ));
}
