<script lang="ts">
  import { fetchAdsForCategories } from "../../api/helpers"

  import {
    createTable,
    Render,
    Subscribe,
    createRender,
  } from "svelte-headless-table"
  import {
    addPagination,
    addSortBy,
    addTableFilter,
    addHiddenColumns,
    addColumnFilters,
    addDataExport,
  } from "svelte-headless-table/plugins"

  import { WebsiteName } from "../../../config"
  import { onMount } from "svelte"
  import { subscribeToAds } from "$lib/supabase/subscribeToAds"
  import { page } from "$app/stores"
  import { useQueryClient, createQuery } from "@tanstack/svelte-query"
  import { writable } from "svelte/store"

  const queryClient = useQueryClient()
  const ads = writable(null)

  // $: ads = queryClient.getQueryData({
  //   queryKey: ["ads", $page.params.cat],
  // })

  // const ads = await queryClient.ensureQueryData({ queryKey, queryFn })

  // const ads = queryClient.getQueryData(["ads", $page.params.cat])
  $: $page.params.cat,
    () => {
      const cat = $page.params.cat // 'sales' lub 'rental'
      const cachedData = queryClient.getQueryData(["ads", cat])
      ads.set(cachedData)
    }

  // $: ads = createQuery({
  //   queryKey: ["ads", $page.params.cat],
  //   queryFn: async () =>
  //     (await fetch(`../api?category=${$page.params.cat}`)).json(),
  // })

  // const table = createTable(writable($ads.data))
  // const columns = table.createColumns([
  //   table.column({
  //     accessor: "title",
  //     header: "Tytuł",
  //     plugins: {
  //       sort: {
  //         disable: false,
  //       },
  //       filter: {
  //         exclude: false,
  //       },
  //     },
  //   }),
  // ])

  // const {
  //   headerRows,
  //   pageRows,
  //   tableAttrs,
  //   tableBodyAttrs,
  //   pluginStates,
  //   flatColumns,
  //   rows,
  // } = table.createViewModel(columns)
  onMount(() => {
    subscribeToAds(queryClient)
  })
</script>

<svelte:head>
  <title>Rental</title>
  <meta name="description" content="Rental ads for {WebsiteName}" />
</svelte:head>
<!-- 
<table {...$tableAttrs}>
  <thead>
    {#each $headerRows as headerRow (headerRow.id)}
      <Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
        <tr {...rowAttrs}>
          {#each headerRow.cells as cell (cell.id)}
            <Subscribe attrs={cell.attrs()} let:attrs>
              <th {...attrs}>
                <Render of={cell.render()} />
              </th>
            </Subscribe>
          {/each}
        </tr>
      </Subscribe>
    {/each}
  </thead>
  <tbody {...$tableBodyAttrs}>
    {#each $rows as row (row.id)}
      <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
        <tr {...rowAttrs}>
          {#each row.cells as cell (cell.id)}
            <Subscribe attrs={cell.attrs()} let:attrs>
              <td {...attrs}>
                <Render of={cell.render()} />
              </td>
            </Subscribe>
          {/each}
        </tr>
      </Subscribe>
    {/each}
  </tbody>
</table> -->

{#if $ads}
  <!-- Wyświetl dane reklam -->
  {#each $ads as ad}
    <div>{ad.title}</div>
    <!-- Przykład wyświetlania tytułu reklamy -->
  {/each}
{:else}
  <p>No ads to display.</p>
{/if}
