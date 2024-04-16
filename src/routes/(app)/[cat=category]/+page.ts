// import { api } from '$lib/api.js';
// import type { PageLoad } from './$types'

// export const load: PageLoad = async ({ parent, fetch, params }) => {
//   const { queryClient } = await parent()

//   const category = params.cat

//   await queryClient.prefetchQuery({
//     queryKey: ['ads', category],
//     queryFn: () => api(fetch).getAdsByCategory(category),
//   })

//   return { category }
// }


import { api } from '$lib/api.js';

export async function load({ fetch, parent, params }) {
  const { queryClient } = await parent();
  const categories = ['sales', 'rental']; // Tutaj dodajemy wszystkie potrzebne kategorie

  // Iteracja przez wszystkie kategorie i cachowanie danych dla każdej z nich
  await Promise.all(categories.map(category => 
    queryClient.prefetchQuery({
      queryKey: ['ads', category],
      queryFn: () => api(fetch).getAdsByCategory(category),
    })
  ));
  return { category: params.cat }
}
