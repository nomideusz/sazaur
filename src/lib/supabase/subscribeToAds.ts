import { supabase } from "$lib/supabase/createClient"

export function subscribeToAds(queryClient) {

  supabase
  .channel("")
  .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "ads_sell" },
      (payload) => {
            queryClient.invalidateQueries(['ads_combined']);
      }
  )
  .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "ads_rent" },
      (payload) => {
            queryClient.invalidateQueries(['ads_combined']);
      }
  )
  .subscribe();
}
