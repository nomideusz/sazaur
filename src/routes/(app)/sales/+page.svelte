<script lang="ts">
  import { WebsiteName } from "../../../config"
  import { createQuery } from "@tanstack/svelte-query"

  const sellQuery = createQuery({
    queryKey: ["ads_combined"],
    queryFn: async () => (await fetch("api")).json(),
    select: (data) => data.sell,
  })
</script>

<svelte:head>
  <title>Salling</title>
  <meta name="description" content="Rental ads for {WebsiteName}" />
</svelte:head>

<div class="min-h-[70vh] pb-8 overflow-x-auto">
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" class="checkbox" />
          </label>
        </th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {#if $sellQuery.data && Array.isArray($sellQuery.data)}
        {#each $sellQuery.data as ad}
          <tr>
            <th>
              <label>
                <input type="checkbox" class="checkbox" />
              </label>
            </th>
            <td>
              <div class="flex items-center gap-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img
                      src={ad.image_url}
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div class="font-bold">{ad.title}</div>
                  <div class="text-sm opacity-50">{ad.city}</div>
                </div>
              </div>
            </td>
            <td>
              {ad.city}
              <br />
              <span class="badge badge-ghost badge-sm">{ad.date}</span>
            </td>
            <td>{ad.price}</td>
            <th>
              <button class="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
        {/each}
      {:else}
        <p>Dane nie są dostępne w cache.</p>
      {/if}
    </tbody>
    <!-- foot -->
    <tfoot>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </tfoot>
  </table>
</div>
