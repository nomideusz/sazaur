<script lang="ts">
  import { WebsiteName } from "../../../config"
  import { useQueryClient } from "@tanstack/svelte-query"
  const client = useQueryClient()
  const cachedData = client.getQueryData(["ads"])
  console.log(cachedData)
</script>

<svelte:head>
  <title>Rental</title>
  <meta name="description" content="Rental ads for {WebsiteName}" />
</svelte:head>
{#if cachedData}
  {#each cachedData as ad}
    <p>{ad.title}</p>
  {/each}
{:else}
  <p>Dane nie są dostępne w cache.</p>
{/if}
