<script lang="ts">
  import { api } from "$lib/api.js"
  import { createQuery } from "@tanstack/svelte-query"
  import { writable } from "svelte/store"
  import {
    createSvelteTable,
    flexRender,
    getCoreRowModel,
  } from "@tanstack/svelte-table"
  import type { ColumnDef, TableOptions } from "@tanstack/svelte-table"
  import type { Ad } from "$lib/types"
  export let category: string

  $: ads = createQuery<Ad[]>({
    queryKey: ["ads", category],
    queryFn: () => api().getAdsByCategory(category),
  })

  const defaultColumns: ColumnDef<Ad>[] = [
    {
      accessorKey: "Id",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    },
    {
      accessorFn: (row) => row.title,
      id: "title",
      cell: (info) => info.getValue(),
      header: () => "Tytuł",
      footer: (info) => info.column.id,
    },
    {
      accessorKey: "price",
      header: () => "Cena",
      footer: (info) => info.column.id,
    },
    {
      accessorKey: "sqm",
      header: () => "Powierzchnia",
      footer: (info) => info.column.id,
    },
    {
      accessorKey: "is_private",
      header: "Status",
      footer: (info) => info.column.id,
    },
    {
      accessorKey: "property_type",
      header: "Rodzaj nieruchomości",
      footer: (info) => info.column.id,
    },
  ]

  $: options = writable<TableOptions<Ad>>({
    data: $ads.data,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  const rerender = () => {
    options.update((options) => ({
      ...options,
      data: $ads.data,
    }))
  }

  $: table = createSvelteTable(options)
</script>

<!-- <pre>$data = {JSON.stringify($ads.data, null, 2)}</pre> -->
<div class="overflow-x-auto">
  <table class="table table-xs">
    <thead>
      {#each $table.getHeaderGroups() as headerGroup}
        <tr>
          {#each headerGroup.headers as header}
            <th>
              {#if !header.isPlaceholder}
                <svelte:component
                  this={flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                />
              {/if}
            </th>
          {/each}
        </tr>
      {/each}
    </thead>
    <tbody>
      {#each $table.getRowModel().rows as row}
        <tr>
          {#each row.getVisibleCells() as cell}
            <td>
              <svelte:component
                this={flexRender(cell.column.columnDef.cell, cell.getContext())}
              />
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
    <tfoot>
      {#each $table.getFooterGroups() as footerGroup}
        <tr>
          {#each footerGroup.headers as header}
            <th>
              {#if !header.isPlaceholder}
                <svelte:component
                  this={flexRender(
                    header.column.columnDef.footer,
                    header.getContext(),
                  )}
                />
              {/if}
            </th>
          {/each}
        </tr>
      {/each}
    </tfoot>
  </table>
  <div class="h-4" />
  <button on:click={() => rerender()} class="border p-2"> Rerender </button>
</div>

<!-- <div class="overflow-x-auto">
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
</div> -->
