<script lang="ts">
  import { api } from "$lib/api.js"
  import { onMount } from "svelte"
  import { createQuery, useQueryClient } from "@tanstack/svelte-query"
  import { subscribeToAds } from "$lib/supabase/subscribeToAds"
  import Popover from "$lib/components/ui/popover.svelte"
  import { WebsiteName } from "../config"
  import logo from "$lib/img/zaur07.png?enhanced&w=400"
  import { TextGenerateEffect } from "$lib/components/ui/TextGenerateEffect"
  $: queryClient = useQueryClient()

  $: adsSales = createQuery({
    queryKey: ["ads", "sales"],
    queryFn: () => api(fetch).getAdsByCategory("sales"),
  })

  $: adsRental = createQuery({
    queryKey: ["ads", "rental"],
    queryFn: () => api(fetch).getAdsByCategory("rental"),
  })

  $: countSales = $adsSales.data.length
  $: countRental = $adsRental.data.length
  $: countTotal = countSales + countRental

  const words = `Potwornie inteligentny. Nie ma żadnych problemów. Inteligentny. Potwornie inteligentny. Nie ma żadnych problemów. Inteligentny. Potwornie inteligentny. Nie ma żadnych problemów. Inteligentny.`

  onMount(() => {
    subscribeToAds(queryClient)
  })
</script>

<svelte:head>
  <title>{WebsiteName}</title>
  <meta name="description" content="{WebsiteName} Home Page" />
</svelte:head>

<!-- <pre>$isMutating = {JSON.stringify(isMutating, null, 2)}</pre> -->
<Popover />

<div class="hero min-h-[50vh]">
  <div class="hero-content text-center">
    <div class="max-w-xl">
      <enhanced:img class="" src={logo} alt="Zaur" sizes="min(400px)" />
      <div class="text-4xl md:text-7xl px-2" style="line-height: 1.3;">
        <span
          class="text-primary font-display underline decoration-secondary decoration-4 md:decoration-[6px]"
          >Zaur</span
        >
      </div>
    </div>
  </div>
</div>
<TextGenerateEffect
  {words}
  className="max-w-[1000px] mx-auto mb-24 text-center"
/>
<div class="flex justify-center">
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
</div>
