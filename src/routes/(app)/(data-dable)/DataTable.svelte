<script lang="ts">
  import { api } from "$lib/api.js"
  import { createQuery } from "@tanstack/svelte-query"
  import { writable } from "svelte/store"
  import { Button, Tabs } from "bits-ui"
  import { DropdownMenu } from "$lib/components/ui/DropdownMenu"
  import ColumnsVisibility from "./ColumnsVisibility.svelte"
  import { Popover } from "$lib/components/ui/Popover"
  import { ALargeSmall } from "lucide-svelte"
  import { priceFormatter, squareMeterFormatter } from "$lib/utils/formatter"
  import {
    createSvelteTable,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
  } from "@tanstack/svelte-table"
  import type {
    ColumnDef,
    OnChangeFn,
    FilterFn,
    FilterFnOption,
    SortingState,
    TableOptions,
    VisibilityState,
    PaginationState,
    ColumnFiltersTableState,
    ColumnFiltersState,
    GlobalFilterColumn,
    ColumnFilter,
  } from "@tanstack/svelte-table"
  import type { Ad } from "$lib/types"

  export let category: string

  let useXS = writable(false)

  const defaultColumns: ColumnDef<Ad>[] = [
    {
      accessorKey: "id",
      cell: (info) => info.getValue(),
      header: "id",
      footer: (info) => info.column.id,
      enableColumnFilter: false,
    },
    {
      accessorKey: "title",
      cell: (info) => info.getValue(),
      header: "tytuł",
      footer: (info) => info.column.id,
      filterFn: "includesString",
      sortingFn: "text",
      enableHiding: false,
    },
    {
      accessorKey: "price",
      filterFn: "inNumberRange",
      cell: (info) => priceFormatter(info.getValue()),
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
      cell: (info) => squareMeterFormatter(info.getValue()),
      footer: (info) => info.column.id,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "price_per_sqm",
      header: "cena za m2",
      cell: (info) => priceFormatter(info.getValue()),
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

  let titleFilter = ""

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

  let columnVisibility: VisibilityState = {
    id: false,
    city: false,
    ad_link: false,
    image_url: false,
    property_type: false,
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

  let pagination: PaginationState = { pageIndex: 0, pageSize: 50 }
  const setPagination: OnChangeFn<PaginationState> = (updater) => {
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

  $: ads = createQuery<Ad[], Error>({
    queryKey: ["ads", category],
    queryFn: () => api().getAdsByCategory(category),
  })

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
      ],
      expanded: true,
      globalFilter: titleFilter,
    },
    state: {
      sorting,
      columnVisibility,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    isMultiSortEvent: (e) => e.ctrlKey || e.shiftKey,
    debugTable: true,
  })

  $: table = createSvelteTable(options)
  const handleKeyUp = (e: any) => {
    $table.setGlobalFilter(String(e?.target?.value))
  }
</script>

<!-- <pre>$ads.status = {JSON.stringify($ads.status, null, 2)}</pre>
<pre>{JSON.stringify($table.getState().sorting, null, 2)}</pre>
<pre>{JSON.stringify($table.getState().globalFilter, null, 2)}</pre>-->
<!-- <pre>{JSON.stringify($table.getState(), null, 2)}</pre> -->

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

<div class="mx-auto w-full">
  <!-- Start coding here -->
  <div class="relative">
    <div
      class="flex flex-col items-center justify-between py-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4"
    >
      <div class="w-full md:w-1/2">
        <label
          class="input input-bordered input-primary flex items-center gap-2"
        >
          <input
            type="text"
            class="grow"
            bind:value={titleFilter}
            on:keyup={handleKeyUp}
            placeholder="Szukaj w tytułach"
          />
          <kbd class="kbd kbd-sm">⌘</kbd>
          <kbd class="kbd kbd-sm">K</kbd>
        </label>
      </div>
      <div
        class="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3"
      >
        <button
          class="btn btn-outline btn-primary"
          on:click={() => ($useXS = !$useXS)}
        >
          <ALargeSmall class={$useXS ? "w-7 h-7" : "w-6 h-6"} />
        </button>
        <div class="flex items-center w-full space-x-3 md:w-auto">
          <Popover label="Filtry" />
          <ColumnsVisibility label="Kolumny" table={$table}>
            <!-- <div class="flex gap-2">
              <div class="form-control">
                <label class="label cursor-pointer place-content-start gap-2">
                  <input
                    checked={$table.getIsAllColumnsVisible()}
                    on:change={(e) => {
                      console.info(
                        $table.getToggleAllColumnsVisibilityHandler()(e),
                      )
                    }}
                    type="checkbox"
                    class="checkbox checkbox-primary"
                  />
                  <span class="label-text">Toggle All</span>
                </label>
                {#each $table.getAllColumns() as column}
                  <label class="label cursor-pointer place-content-start gap-2">
                    <input
                      checked={column.getIsVisible()}
                      disabled={!column.getCanHide()}
                      on:change={column.getToggleVisibilityHandler()}
                      type="checkbox"
                      class="checkbox checkbox-primary"
                    />
                    <span class="label-text">{column.columnDef.header}</span>
                  </label>
                {/each}
              </div>
            </div> -->
          </ColumnsVisibility>
        </div>
      </div>
    </div>
  </div>
</div>

{#if $ads.isLoading}
  <span class="loading loading-ring loading-lg"></span>
{/if}
{#if $ads.error}
  <span>Error: {$ads.error.message}</span>
{/if}
{#if $ads.isSuccess}
  <div>{$ads.isFetching ? "Background Updating..." : " "}</div>
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
                {#if cell.column.columnDef.accessorKey === "title"}
                  <a
                    href={row.original.ad_link}
                    title={row.original.title}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svelte:component
                      this={flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    />
                  </a>
                {:else}
                  <svelte:component
                    this={flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
                    )}
                  />
                {/if}
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
  </div>
  <div class="pt-4 flex gap-2 justify-end">
    <div>{$table.getRowModel().rows.length} Rows</div>
    <div class="join">
      <button
        class="join-item btn"
        class:btn-disabled={!$table.getCanPreviousPage()}
        on:click={() => $table.firstPage()}>First</button
      >

      <button
        class="join-item btn"
        class:btn-disabled={!$table.getCanPreviousPage()}
        on:click={() => $table.previousPage()}>Previous</button
      >
      <button
        class="join-item btn"
        class:btn-disabled={!$table.getCanNextPage()}
        on:click={() => $table.nextPage()}>Next</button
      >
      <button
        class="join-item btn"
        class:btn-disabled={!$table.getCanNextPage()}
        on:click={() => $table.lastPage()}>Last</button
      >
    </div>
    <!-- <button on:click={() => rerender()} class="border p-2"> Rerender </button> -->
  </div>
{/if}
