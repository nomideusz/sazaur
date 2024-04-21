import { supabase } from "$lib/supabase/createClient"
import { success, info, warning, error, neutral } from "$lib/utils/toast"
export function subscribeToAds(queryClient) {

  supabase
  .channel("")
  .on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "ads_sell" },
    (payload) => {
      const newAd = payload.new;
      queryClient.setQueryData(['ads', 'sales'], oldAds => [newAd, ...oldAds]);
      success(newAd.title)
    }
)
.on(
  "postgres_changes",
  { event: "DELETE", schema: "public", table: "ads_sell" },
  (payload) => {
    const deletedId = payload.old.id;
    queryClient.setQueryData(['ads', 'sales'], oldAds => oldAds.filter(ad => ad.id !== deletedId));
  }
)
.on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "ads_rent" },
    (payload) => {
      const newAd = payload.new;
      queryClient.setQueryData(['ads', 'rental'], oldAds => [newAd, ...oldAds]);
      success(newAd.title)
    }
)
.on(
  "postgres_changes",
  { event: "DELETE", schema: "public", table: "ads_rent" },
  (payload) => {
    const deletedId = payload.old.id;
    queryClient.setQueryData(['ads', 'rental'], oldAds => oldAds.filter(ad => ad.id !== deletedId));
  }
)
  .subscribe();
}
