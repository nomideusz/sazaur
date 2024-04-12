<script lang="ts">
  import { api } from "$lib/api.js"
  import { createQuery } from "@tanstack/svelte-query"
  import { writable } from "svelte/store"
  import {
    createSvelteTable,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
  } from "@tanstack/svelte-table"
  import type {
    ColumnDef,
    OnChangeFn,
    SortingState,
    TableOptions,
  } from "@tanstack/svelte-table"
  import type { Ad } from "$lib/types"
  export let category: string

  import CompactTable from "./CompactTable.svelte"
  import DetailedTable from "./DetailedTable.svelte"

  let useDetailed = writable(false)

  $: ads = createQuery<Ad[]>({
    queryKey: ["ads", category],
    queryFn: () => api().getAdsByCategory(category),
  })

  const defaultColumns: ColumnDef<Ad>[] = [
    {
      accessorKey: "id",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    },
    {
      accessorFn: (row) => row.title,
      sortingFn: "text",
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
      accessorKey: "city",
      header: () => "Miasto",
      footer: (info) => info.column.id,
    },
    {
      accessorKey: "district",
      header: "Dzielnica",
      footer: (info) => info.column.id,
    },
    {
      accessorKey: "date",
      header: () => "Data dotania",
      footer: (info) => info.column.id,
    },
    {
      accessorKey: "sqm",
      header: () => "Powierzchnia",
      footer: (info) => info.column.id,
    },
    {
      accessorKey: "price_per_sqm",
      header: () => "Cena za m2",
      footer: (info) => info.column.id,
    },
    {
      accessorKey: "ad_link",
      header: "Link",
      footer: (info) => info.column.id,
    },
    {
      accessorKey: "created_at",
      header: () => "Zzaurowane",
      footer: (info) => info.column.id,
    },
    {
      accessorKey: "is_private",
      header: () => "Agencja?",
      footer: (info) => info.column.id,
    },
    {
      accessorKey: "image_url",
      header: () => "URL obrazka",
      footer: (info) => info.column.id,
    },
    {
      accessorKey: "property_type",
      header: "Rodzaj",
      footer: (info) => info.column.id,
    },
    {
      accessorKey: "region_name",
      header: () => "Region",
      footer: (info) => info.column.id,
    },
  ]

  let sorting: SortingState = []

  const setSorting: OnChangeFn<SortingState> = (updater) => {
    if (updater instanceof Function) {
      sorting = updater(sorting)
    } else {
      sorting = updater
    }
    options.update((old) => ({
      ...old,
      state: {
        ...old.state,
        sorting,
      },
    }))
  }

  $: options = writable<TableOptions<Ad>>({
    data: $ads.data,
    columns: defaultColumns,
    initialState: {
      columnOrder: [
        "title",
        "district",
        "region_name",
        "price",
        "sqm",
        "price_per_sqm",
      ], //customize the initial column order
      columnVisibility: {
        id: false,
        city: false,
        ad_link: false,
        image_url: false,
      },
      expanded: true, //expand all rows by default
    },
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    isMultiSortEvent: (e) => e.ctrlKey || e.shiftKey,
    debugTable: true,
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

<button
  class="btn btn-primary mb-4"
  on:click={() => ($useDetailed = !$useDetailed)}
>
  {#if $useDetailed}
    Switch to Compact View
  {:else}
    Switch to Detailed View
  {/if}
</button>
{#if $ads.status === "pending"}
  <span>Loading...</span>
{:else if $ads.status === "error"}
  <span>Error: {$ads.error.message}</span>
{:else if $ads.isSuccess && $ads.data}
  <div class="overflow-x-auto">
    {#if $useDetailed}
      <DetailedTable rows={$table.getRowModel().rows} />
    {:else}
      <CompactTable rows={$table.getRowModel().rows} />
    {/if}
  </div>
{/if}

{#if $ads.status === "pending"}
  <span>Loading...</span>
{:else if $ads.status === "error"}
  <span>Error: {$ads.error.message}</span>
{:else if $ads.isSuccess && $ads.data}
  <div class="overflow-x-auto">
    <table class="table table-xs">
      <thead>
        {#each $table.getHeaderGroups() as headerGroup}
          <tr>
            {#each headerGroup.headers as header}
              <th>
                {#if !header.isPlaceholder}
                  <button
                    class:cursor-pointer={header.column.getCanSort()}
                    class:select-none={header.column.getCanSort()}
                    on:click={header.column.getToggleSortingHandler()}
                  >
                    <svelte:component
                      this={flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    />
                    {#if header.column.getIsSorted().toString() === "asc"}
                      🔼
                    {:else if header.column.getIsSorted().toString() === "desc"}
                      🔽
                    {/if}
                  </button>
                  {#if header.column.getIsSorted() && $table.getState().sorting.length > 1}
                    {header.column.getSortIndex() + 1}
                  {/if}
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
                  this={flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext(),
                  )}
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
    <div>{$table.getRowModel().rows.length} Rows</div>
    <button on:click={() => rerender()} class="border p-2"> Rerender </button>
    <pre>{JSON.stringify($table.getState().sorting, null, 2)}</pre>
  </div>
{/if}
