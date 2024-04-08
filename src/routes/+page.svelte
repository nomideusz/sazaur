<script lang="ts">
  import { onMount } from "svelte"
  import { createQuery, useQueryClient } from "@tanstack/svelte-query"
  import { subscribeToAds } from "$lib/supabase/subscribeToAds"
  import { fetchAdsForCategories } from "./helpers"
  import { WebsiteName } from "../config"
  import logo from "$lib/img/zaur.png?enhanced&w=373"
  import { Button } from "bits-ui"
  let queryClient = useQueryClient()
  // const categories = ["rental", "sales"]
  // $: ads = createQuery({
  //   queryKey: ["ads", ...categories], // Rozwinięcie tablicy kategorii do klucza zapytania
  //   queryFn: () => fetchAdsForCategories("rental"),
  // })

  onMount(() => {
    subscribeToAds(queryClient)
  })
</script>

<svelte:head>
  <title>{WebsiteName}</title>
  <meta name="description" content="{WebsiteName} Home Page" />
</svelte:head>
<!-- <p>{$query.data.length}</p> -->
<!-- <div>
  {#if $query.data && Array.isArray($query.data.combined)}
    {#each $query.data.combined as ad}
      <p>{ad.price}</p>
    {/each}
  {:else}
    <span class="loading loading-ring loading-lg"></span>
  {/if}
</div> -->

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
    <div class="stat-title">Downloads</div>
    <div class="stat-value"></div>
    <div class="stat-desc">Jan 1st - Feb 1st</div>
  </div>

  <div class="stat">
    <div class="stat-title">New Users</div>
    <div class="stat-value"></div>
    <div class="stat-desc">↗︎ 400 (22%)</div>
  </div>

  <div class="stat">
    <div class="stat-title">New Registers</div>
    <div class="stat-value"></div>
    <div class="stat-desc">↘︎ 90 (14%)</div>
  </div>
</div>
