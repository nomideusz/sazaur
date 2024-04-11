<script lang="ts">
  import { api } from "$lib/api.js"
  import { WebsiteName } from "../../../config"
  import { onMount } from "svelte"
  import { subscribeToAds } from "$lib/supabase/subscribeToAds"
  import { page } from "$app/stores"
  import { useQueryClient, createQuery } from "@tanstack/svelte-query"

  let translation

  const queryClient = useQueryClient()

  $: category = $page.params.cat

  async function translate() {
    const response = await fetch(`/${category}/translate`)
    translation = await response
  }

  $: ads = createQuery({
    queryKey: ["ads", category],
    queryFn: () => api(fetch).getAdsByCategory(category),
  })

  onMount(() => {
    subscribeToAds(queryClient)
  })
</script>

<svelte:head>
  <title>{category}</title>
  <meta name="description" content="Rental ads for {WebsiteName}" />
</svelte:head>
<button class="btn" on:click={translate}>Translate</button>

{#if !translation === undefined}
  <p>Oto tłumaczenie: {translation}</p>
{/if}

<!-- <pre>$ads = {JSON.stringify($ads, null, 2)}</pre> -->

<div class="overflow-x-auto">
  <table class="table table-xs">
    <thead>
      <tr>
        <th></th>
        <th>tytuł</th>
        <th>dzielnica</th>
        <th>cena</th>
        <th>miasto</th>
        <th>data dodania ogłoszenia</th>
        <th>prywatne/agencja</th>
      </tr>
    </thead>
    <tbody>
      {#if $ads.status === "pending"}
        <span>Loading...</span>
      {:else if $ads.status === "error"}
        <span>Error: {$ads.error.message}</span>
      {:else if $ads.isSuccess && $ads.data[category]}
        {#each $ads.data[category] as ad}
          <tr>
            <th>{ad.id}</th>
            <td>{ad.title}</td>
            <td>{ad.district}</td>
            <td>{ad.price}</td>
            <td>{ad.city}</td>
            <td>{ad.date}</td>
            <td>{ad.is_private}</td>
          </tr>
        {/each}
        {#if $ads.isFetching}
          <div style="color:darkgreen; font-weight:700">
            Background Updating...
          </div>
        {/if}
      {:else}
        <p>No ads to display.</p>
      {/if}
    </tbody>
    <tfoot>
      <tr>
        <th></th>
        <th>tytuł</th>
        <th>dzielnica</th>
        <th>cena</th>
        <th>miasto</th>
        <th>data dodania ogłoszenia</th>
        <th>prywatne/agencja</th>
      </tr>
    </tfoot>
  </table>
</div>
