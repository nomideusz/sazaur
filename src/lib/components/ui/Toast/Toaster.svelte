<script lang="ts" context="module">
  export type ToastData = {
    title: string
    description: string
    color: string
  }
  const {
    elements,
    helpers,
    states: { toasts },
    actions: { portal },
  } = createToaster<ToastData>()

  export const addToast = helpers.addToast

  export function notifySuccess(message: string) {
    addToast({
      data: { title: "Success", description: message, color: "bg-green-500" },
    })
  }

  export function notifyWarning(message: string) {
    addToast({
      data: { title: "Warning", description: message, color: "bg-orange-500" },
    })
  }

  export function notifyError(message: string) {
    addToast({
      data: { title: "Error", description: message, color: "bg-red-500" },
    })
  }
</script>

<script lang="ts">
  import { createToaster } from "@melt-ui/svelte"
  import { flip } from "svelte/animate"
  import Toast from "./toast.svelte"
</script>

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
