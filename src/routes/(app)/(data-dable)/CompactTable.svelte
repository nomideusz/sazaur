<script>
  import TableRow from "./TableRow.svelte"
  export let rows
</script>

<table class="table table-xs">
  {#each rows as row}
    <tr>
      <th>1</th>
      <td>Cy Ganderton</td>
      <td>Quality Control Specialist</td>
      <td>Littel, Schaden and Vandervort</td>
      <td>Canada</td>
      <td>12/16/2020</td>
      <td>Blue</td>
    </tr>
  {/each}
</table>
