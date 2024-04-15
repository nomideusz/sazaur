<script lang="ts">
  import { api } from "$lib/api.js"
  import { createQuery } from "@tanstack/svelte-query"
  import { writable } from "svelte/store"
  import { Button, Tabs } from "bits-ui"
  import {
    createSvelteTable,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
  } from "@tanstack/svelte-table"
  import type {
    ColumnDef,
    OnChangeFn,
    SortingState,
    TableOptions,
    VisibilityState,
    PaginationState,
  } from "@tanstack/svelte-table"
  import type { Ad } from "$lib/types"
  export let category: string

  let useXS = writable(false)

  $: ads = createQuery<Ad[]>({
    queryKey: ["ads", category],
    queryFn: () => api().getAdsByCategory(category),
  })

  const defaultColumns: ColumnDef<Ad>[] = [
    {
      accessorKey: "id",
      cell: (info) => info.getValue(),
      header: "id",
      footer: (info) => info.column.id,
      enableColumnFilter: false,
      enableGlobalFilter: false,
    },
    {
      accessorFn: (row) => row.title,
      filterFn: "includesString",
      sortingFn: "text",
      id: "title",
      cell: (info) => info.getValue(),
      header: "tytuł",
      footer: (info) => info.column.id,
    },
    {
      accessorKey: "price",
      filterFn: "inNumberRange",
      header: "cena",
      footer: (info) => info.column.id,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "city",
      header: "miasto",
      footer: (info) => info.column.id,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "district",
      header: "dzielnica",
      footer: (info) => info.column.id,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "date",
      header: "data dotania",
      footer: (info) => info.column.id,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "sqm",
      header: "powierzchnia",
      filterFn: "inNumberRange",
      footer: (info) => info.column.id,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "price_per_sqm",
      header: "cena za m2",
      filterFn: "inNumberRange",
      footer: (info) => info.column.id,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "ad_link",
      header: "link",
      footer: (info) => info.column.id,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "created_at",
      header: "zzaurowane",
      footer: (info) => info.column.id,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "is_private",
      header: "agencja?",
      footer: (info) => info.column.id,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "image_url",
      header: "URL obrazka",
      footer: (info) => info.column.id,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "property_type",
      header: "rodzaj",
      footer: (info) => info.column.id,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "region_name",
      header: "region",
      footer: (info) => info.column.id,
      enableGlobalFilter: false,
    },
  ]

  let sorting: SortingState = []
  let columnVisibility: VisibilityState = {}
  let globalFilter = ""
  let pagination = { pageIndex: 0, pageSize: 15 } //default pagination

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

  const setColumnVisibility: OnChangeFn<VisibilityState> = (updater) => {
    if (updater instanceof Function) {
      columnVisibility = updater(columnVisibility)
    } else {
      columnVisibility = updater
    }
    options.update((old) => ({
      ...old,
      state: {
        ...old.state,
        columnVisibility,
      },
    }))
  }

  const setPagination = (updater) => {
    if (updater instanceof Function) {
      pagination = updater(pagination)
    } else {
      pagination = updater
    }
    options.update((old) => ({
      ...old,
      state: {
        ...old.state,
        pagination,
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
      columnVisibility,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
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
  const handleKeyUp = (e: any) => {
    $table.setGlobalFilter(String(e?.target?.value))
  }
</script>

<!-- <pre>$data = {JSON.stringify($ads.data, null, 2)}</pre> -->
<pre>{JSON.stringify($table.getState().sorting, null, 2)}</pre>
<pre>{JSON.stringify($table.getState().globalFilter, null, 2)}</pre>
<pre>{JSON.stringify($table.getState().pagination, null, 2)}</pre>

<div class="flex gap-2">
  <label class="input input-bordered flex items-center gap-2">
    <input
      type="text"
      class="grow"
      placeholder="Szukaj w tytułach ofert"
      bind:value={globalFilter}
      on:keyup={handleKeyUp}
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      class="w-4 h-4 opacity-70"
      ><path
        fill-rule="evenodd"
        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
        clip-rule="evenodd"
      /></svg
    >
  </label>

  <button class="btn btn-primary mb-4" on:click={() => ($useXS = !$useXS)}>
    {#if $useXS}
      Switch to Detailed View
    {:else}
      Switch to Compact View
    {/if}
  </button>

  <div class="form-control">
    <label class="label cursor-pointer place-content-start gap-2">
      <input
        checked={$table.getIsAllColumnsVisible()}
        on:change={(e) => {
          console.info($table.getToggleAllColumnsVisibilityHandler()(e))
        }}
        type="checkbox"
        class="checkbox checkbox-primary"
      />
      <span class="label-text">Toggle All</span>
    </label>
    {#each $table.getAllLeafColumns() as column}
      <label class="label cursor-pointer place-content-start gap-2">
        <input
          checked={column.getIsVisible()}
          on:change={column.getToggleVisibilityHandler()}
          type="checkbox"
          class="checkbox checkbox-primary"
        />
        <span class="label-text">{column.columnDef.header}</span>
      </label>
    {/each}
  </div>
</div>

<div class="join">
  <button class="join-item btn">1</button>
  <button class="join-item btn">2</button>
  <button class="join-item btn btn-disabled">...</button>
  <button class="join-item btn">99</button>
  <button class="join-item btn">100</button>
</div>
<div class="flex items-center justify-end space-x-4 py-4">
  <button
    class="btn"
    on:click={() => $table.firstPage()}
    disabled={!$table.getCanPreviousPage()}>First</button
  >
  <button
    class="btn"
    on:click={() => $table.previousPage()}
    disabled={!$table.getCanPreviousPage()}>Previous</button
  >
  <button
    class="btn"
    disabled={!$table.getCanNextPage()}
    on:click={() => $table.nextPage()}>Next</button
  >
  <button
    class="btn"
    disabled={!$table.getCanNextPage()}
    on:click={() => $table.lastPage()}>Last</button
  >
</div>

<Tabs.Root class="" value="mieszkania">
  <Tabs.List class="tabs tabs-boxed">
    <Tabs.Trigger class="tab data-[state=active]:tab-active" value="mieszkania"
      >mieszkania</Tabs.Trigger
    >
    <Tabs.Trigger class="tab data-[state=active]:tab-active" value="domy"
      >domy</Tabs.Trigger
    >
    <Tabs.Trigger class="tab data-[state=active]:tab-active" value="garaże"
      >garaże</Tabs.Trigger
    >
  </Tabs.List>
  <Tabs.Content value="mieszkania" class="pt-3">Mieszkania</Tabs.Content>
  <Tabs.Content value="domy" class="pt-3">Domy</Tabs.Content>
  <Tabs.Content value="garaże" class="pt-3">Garaże</Tabs.Content>
</Tabs.Root>

{#if $ads.status === "pending"}
  <span class="loading loading-ring loading-lg"></span>
{:else if $ads.status === "error"}
  <span>Error: {$ads.error.message}</span>
{:else if $ads.isSuccess && $ads.data}
  <div class="overflow-x-auto">
    <table class="table {$useXS ? 'table-xs' : ''}">
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
                <!-- {#if header.column.getCanFilter()}
                  <div>
                    {header.column.getFilterValue()}
                  </div>
                {/if} -->
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
  </div>
{/if}
