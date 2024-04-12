<script lang="ts">
  // import { api } from "$lib/api.js"
  import { WebsiteName } from "../../../config"
  import { onMount } from "svelte"
  import { subscribeToAds } from "$lib/supabase/subscribeToAds"
  import { useQueryClient } from "@tanstack/svelte-query"
  import DataTable from "../(data-dable)/DataTable.svelte"
  import type { PageData } from "./$types"

  export let data: PageData

  // let translation

  const queryClient = useQueryClient()

  // async function translate() {
  //   const response = await fetch(`/${category}/translate`)
  //   translation = await response
  // }

  // $: ads = createQuery({
  //   queryKey: ["ads", category],
  //   queryFn: () => api(fetch).getAdsByCategory(category),
  // })

  onMount(() => {
    subscribeToAds(queryClient)
  })
</script>

<svelte:head>
  <title>{data.category}</title>
  <meta name="description" content="Rental ads for {WebsiteName}" />
</svelte:head>
<!-- <button class="btn" on:click={translate}>Translate</button> -->

<!-- {#if !translation === undefined}
  <p>Oto tłumaczenie: {translation}</p>
{/if} -->

<!-- <pre>$ads = {JSON.stringify($ads, null, 2)}</pre> -->

<DataTable category={data.category} />
