<script lang="ts">
  import type { ActionMapping } from "../../models/capabilities/smart-home-generics/actionMapping.model";

  export let actionMappings: Array<ActionMapping>;

  function removeActionMapping(i) {}
</script>

{#if actionMappings.length > 0}
  <table>
    <thead>
      <tr>
        <th>Actions</th>
        <th>Mapped Directive</th>
        <th>Payload</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#each actionMappings as actionMapping, i}
        <tr>
          <td>{actionMapping.actions}</td>
          <td>{actionMapping.directive}</td>
          <td>payload here</td>
          <td>
            <a
              href="#!"
              class="waves-effect waves-teal btn-flat"
              on:click={() => removeActionMapping({ i })}>Remove</a
            >
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
