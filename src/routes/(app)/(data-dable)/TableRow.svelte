<script>
  export let row
  export let detailed = false
</script>

<tr>
  {#if detailed}
    <td>
      <div class="flex items-center gap-3">
        <div class="avatar">
          <div class="mask mask-squircle w-12 h-12">
            <img
              src="/tailwind-css-component-profile-3@56w.png"
              alt="Avatar Tailwind CSS Component"
            />
          </div>
        </div>
        <div>
          <div class="font-bold">B{row.detailedInfo}</div>
          <div class="text-sm opacity-50">China</div>
        </div>
      </div>
    </td>
  {/if}
  <td>{row.name}</td>
  <td>{row.value}</td>
</tr>
