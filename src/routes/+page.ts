import { fetchAdsForCategories } from './api/helpers.js';

export async function load({ fetch, parent }) {
  const { queryClient } = await parent();

  // Cachowanie danych dla 'sales'
  await queryClient.prefetchQuery({
    queryKey: ['ads', 'sales'],
    queryFn: () => fetchAdsForCategories('sales', { fetch }),
  });

  // Cachowanie danych dla 'rental'
  await queryClient.prefetchQuery({
    queryKey: ['ads', 'rental'],
    queryFn: () => fetchAdsForCategories('rental', { fetch }),
  });
}


