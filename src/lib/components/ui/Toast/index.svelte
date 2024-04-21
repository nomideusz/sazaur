<script lang="ts" context="module">
  export type ToastData = {
    title: string
    description: string
    color: string
  }
</script>

<script lang="ts">
  import { createToaster } from "@melt-ui/svelte"
  import { flip } from "svelte/animate"
  import Toast from "./toast.svelte"

  const {
    elements,
    helpers: { addToast },
    states: { toasts },
    actions: { portal },
  } = createToaster<ToastData>()

  // an example using the default values
  function create() {
    addToast({
      data: {
        title: "Success",
        description: "The resource was created!",
        color: "bg-green-500",
      },
    })
  }

  // an example overriding the default values
  function createImportant() {
    addToast({
      data: {
        title: "Important",
        description: "Important!!",
        color: "bg-red-500",
      },
      closeDelay: 10000, // override the default closeDelay
      type: "foreground", // override the default type
    })
  }
</script>

<button
  class="inline-flex items-center justify-center rounded-xl bg-white px-4 py-3
font-medium leading-none text-magnum-700 shadow hover:opacity-75"
  on:click={create}
>
  Create
</button>

<button
  class="inline-flex items-center justify-center rounded-xl bg-white px-4 py-3
font-medium leading-none text-magnum-700 shadow hover:opacity-75"
  on:click={createImportant}
>
  Create Important
</button>

<div
  class="fixed right-0 top-0 z-50 m-4 flex flex-col items-end gap-2 md:bottom-0 md:top-auto"
  use:portal
>
  {#each $toasts as toast (toast.id)}
    <div animate:flip={{ duration: 500 }}>
      <Toast {elements} {toast} />
    </div>
  {/each}
</div>
