import { fetchAdsForCategories } from './api/helpers';

export async function load({ fetch, parent }) {
  const { queryClient } = await parent();
  const categories = ['sales', 'rental']; // Tutaj dodajemy wszystkie potrzebne kategorie

  // Iteracja przez wszystkie kategorie i cachowanie danych dla każdej z nich
  await Promise.all(categories.map(category => 
    queryClient.prefetchQuery({
      queryKey: ['ads', category],
      queryFn: () => fetchAdsForCategories({ fetch }, category),
    })
  ));

  // Cachowanie danych dla 'sales'
  await queryClient.prefetchQuery({
    queryKey: ['ads', route.id],
    queryFn: () => api(fetch).getAdsByCategory('rental')
  });
}
