<script lang="ts">
  import type { StateMapping } from "../../models/capabilities/smart-home-generics/stateMapping.model";

  //import type { StateMapping } from "../../models/stateMapping.model";

  export let stateMappings: Array<StateMapping>;

  function removeStateMapping(i) {}
</script>

{#if stateMappings.length > 0}
  <table>
    <thead>
      <tr>
        <th>State</th>
        <th>Mapped Value</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#each stateMappings as stateMapping, i}
        <tr>
          <td>{stateMapping.states}</td>
          <td>mapped value here</td>
          <td>
            <a
              href="#!"
              class="waves-effect waves-teal btn-flat"
              on:click={() => removeStateMapping({ i })}>Remove</a
            >
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
