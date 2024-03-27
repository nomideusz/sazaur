export const prerender = false
// W pliku +page.ts lub __layout.ts na stronie głównej
export async function load({ fetch, parent }) {
  const { queryClient } = await parent();

  await queryClient.prefetchQuery({
    queryKey: ['ads_combined'],
    queryFn: async () => {
      const response = await fetch('api');
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },
  });
  return {};
}
