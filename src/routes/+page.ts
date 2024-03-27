export const prerender = false
export async function load({ parent, fetch }) {
    const { queryClient } = await parent();
  
    await queryClient.prefetchQuery({
      queryKey: ['ads'],
      queryFn: async () => {
        const response = await fetch('api');
        const ads = await response.json();
        return ads;
      },
    });

    const cachedData = queryClient.getQueryData(["ads"])
    console.log(cachedData)
    return {};
  }