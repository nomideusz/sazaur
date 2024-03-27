<script lang="ts">
  import PricingModule from "./pricing_module.svelte"
  import { WebsiteName } from "./../../../config"
  import { useQueryClient } from "@tanstack/svelte-query"

  const client = useQueryClient()
  const cachedData = client.getQueryData(["ads"])
  console.log(cachedData)
</script>

<svelte:head>
  <title>Pricing</title>
  <meta name="description" content="Pricing details for {WebsiteName}" />
</svelte:head>
{#if cachedData}
  {#each cachedData as ad}
    <p>{ad.title}</p>
  {/each}
{:else}
  <p>Dane nie są dostępne w cache.</p>
{/if}

<div class="min-h-[70vh] pb-8 pt-[5vh] px-4">
  <h1 class="text-3xl font-bold text-center">Pricing</h1>
  <h2 class="text-xl text-center text-slate-500 mt-1 pb-3">
    Totally free, scale to millions of users
  </h2>

  <div class="w-full my-8">
    <PricingModule callToAction="Get Started" highlightedPlanId="pro" />
  </div>
</div>
