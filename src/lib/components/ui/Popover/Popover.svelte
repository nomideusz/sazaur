<script lang="ts">
  import { createPopover, melt } from "@melt-ui/svelte"
  import { fade } from "svelte/transition"
  import { Settings2, X } from "lucide-svelte"
  export let label: string

  const {
    elements: { trigger, content, arrow, close, overlay },
    states: { open },
  } = createPopover({
    forceVisible: true,
    preventScroll: true,
  })
</script>

<button
  class="btn btn-outline btn-primary"
  type="button"
  use:melt={$trigger}
  aria-label={label}
>
  {label}
  <Settings2 class="size-4" />
</button>

{#if $open}
  <div use:melt={$overlay} class="fixed inset-0 z-40" />
  <div use:melt={$content} transition:fade={{ duration: 100 }} class=" content">
    <div use:melt={$arrow} />
    <div class="flex flex-col gap-2.5">
      <p>Dimensions</p>
      <fieldset>
        <label for="width">Width</label>
        <input type="number" id="width" class="input" placeholder="Width" />
      </fieldset>
      <fieldset>
        <label for="height">Height</label>
        <input type="number" id="height" class="input" placeholder="Height" />
      </fieldset>
      <fieldset>
        <label for="depth">Depth</label>
        <input type="number" id="depth" class="input" placeholder="Depth" />
      </fieldset>
      <fieldset>
        <label for="weight">Weight</label>
        <input type="number" id="weight" class="input" placeholder="Weight" />
      </fieldset>
    </div>
    <button class="close" use:melt={$close}>
      <X class="size-4" />
    </button>
  </div>
{/if}

<style lang="postcss">
  fieldset {
    @apply flex items-center gap-5;
  }

  label {
    @apply w-[75px] text-sm text-neutral-700;
  }

  p {
    @apply mb-2 font-medium text-neutral-900;
  }

  .input {
    @apply flex h-8 w-full rounded-md border border-magnum-800 bg-transparent px-2.5 text-sm;
    @apply ring-offset-magnum-300 focus-visible:ring;
    @apply focus-visible:ring-magnum-400 focus-visible:ring-offset-1;
    @apply flex-1 items-center justify-center;
    @apply px-2.5 text-sm leading-none text-magnum-700;
  }

  .trigger {
    @apply inline-flex h-9 w-9 items-center justify-center rounded-full bg-white p-0;
    @apply text-sm font-medium text-magnum-900 transition-colors hover:bg-white/90;
    @apply focus-visible:ring focus-visible:ring-magnum-400 focus-visible:ring-offset-2;
  }

  .close {
    @apply absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full;
    @apply text-magnum-900 transition-colors hover:bg-magnum-500/10;
    @apply focus-visible:ring focus-visible:ring-magnum-400 focus-visible:ring-offset-2;
    @apply bg-white p-0 text-sm font-medium;
  }

  .content {
    @apply z-40 w-60 rounded-[4px] bg-white p-5 shadow-sm;
  }
</style>
