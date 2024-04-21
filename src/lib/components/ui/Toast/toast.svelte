<script lang="ts">
  import {
    createProgress,
    melt,
    type Toast,
    type ToastsElements,
  } from "@melt-ui/svelte"
  import { createToaster } from "@melt-ui/svelte"
  import { flip } from "svelte/animate"
  import { X } from "lucide-svelte"
  import { writable } from "svelte/store"
  import { onMount } from "svelte"

  const {
    elements,
    helpers: { addToast },
    states: { toasts },
    actions: { portal },
  } = createToaster<ToastData>()

  function create() {
    addToast({
      data: {
        title: "Success",
        description: "The resource was created NOT!",
        color: "green",
      },
    })
  }
</script>

<button on:click={create}> Create </button>
<div
  class="fixed right-0 top-0 z-50 m-4 flex flex-col items-end gap-2 md:bottom-0 md:top-auto"
  use:portal
>
  {#each $toasts as toast (toast.id)}
    <div animate:flip={{ duration: 500 }}>
      <div>
        <h3 class="flex items-center gap-2 font-semibold">kora</h3>
        <div>{create}</div>
      </div>
    </div>
  {/each}
</div>
