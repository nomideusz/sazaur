import { api } from '$lib/api.js';
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ parent, fetch, params }) => {
  const { queryClient } = await parent()

  const category = params.cat

  await queryClient.prefetchQuery({
    queryKey: ['ads', category],
    queryFn: () => api(fetch).getAdsByCategory(category),
  })

  return { category }
}
