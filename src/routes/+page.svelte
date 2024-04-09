<script lang="ts">
  import { api } from "$lib/api.js"
  import { onMount } from "svelte"
  import {
    createQuery,
    useQueryClient,
    useIsMutating,
  } from "@tanstack/svelte-query"
  import { subscribeToAds } from "$lib/supabase/subscribeToAds"
  import { WebsiteName } from "../config"
  import logo from "$lib/img/zaur.png?enhanced&w=373"
  import { Button } from "bits-ui"
  $: queryClient = useQueryClient()
  const isMutating = useIsMutating()

  $: adsSales = createQuery({
    queryKey: ["ads", "sales"],
    queryFn: () => api(fetch).getAdsByCategory("sales"),
  })

  $: adsRental = createQuery({
    queryKey: ["ads", "rental"],
    queryFn: () => api(fetch).getAdsByCategory("rental"),
  })

  $: countSales = $adsSales.data.sales.length
  $: countRental = $adsRental.data.rental.length
  $: countTotal = countSales + countRental

  onMount(() => {
    subscribeToAds(queryClient)
  })
</script>

<svelte:head>
  <title>{WebsiteName}</title>
  <meta name="description" content="{WebsiteName} Home Page" />
</svelte:head>

<pre>$isMutating = {JSON.stringify(isMutating, null, 2)}</pre>

<div class="hero min-h-[60vh]">
  <div class="hero-content text-center py-12">
    <div class="max-w-xl">
      <enhanced:img src={logo} alt="Zaur" sizes="min(400px)" />
      <div
        class="text-4xl md:text-6xl font-bold px-2"
        style="line-height: 1.2;"
      >
        This is
        <span
          class="underline decoration-secondary decoration-4 md:decoration-[6px]"
          >Zaur</span
        >
      </div>
      <Button.Root
        class="inline-flex h-12 items-center justify-center rounded-input bg-white
  px-[21px] text-[15px] font-semibold text-background shadow-mini
  hover:bg-white/95 active:scale-98 active:transition-all"
      >
        Unlimited
      </Button.Root>
    </div>
  </div>
</div>
<div class="stats pb-36 stats-vertical lg:stats-horizontal shadow">
  <div class="stat">
    <div class="stat-title">Sprzedaż</div>
    <div class="stat-value">{countSales}</div>
    <div class="stat-desc">
      {#if $adsSales.isFetching}aktualizuję...{:else}dane aktualne{/if}
    </div>
  </div>
  <div class="stat">
    <div class="stat-title">Wynajem</div>
    <div class="stat-value">{countRental}</div>
    <div class="stat-desc">
      {#if $adsRental.isFetching}aktualizuję...{:else}dane aktualne{/if}
    </div>
  </div>
  <div class="stat">
    <div class="stat-title">Całkowita liczba</div>
    <div class="stat-value">{countTotal}</div>
    <div class="stat-desc">
      {#if $adsSales.isFetching || $adsRental.isFetching}aktualizuję...{:else}dane
        aktualne{/if}
    </div>
  </div>
</div>
