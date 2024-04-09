export const api = (customFetch = fetch) => ({
    getAllAds: async () => {
      const response = await customFetch(
        'api',
      )
      const data = (await response.json())
      return data
    },
    getAdsByCategory: async (cat: string) => {
      const response = await customFetch(
        `../api?category=${cat}`,
      )
      const data = (await response.json())
      return data
    },
  })