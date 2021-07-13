<script lang="ts">
  import { FriendlyNameTypes } from "../../models/capabilities/smart-home-generics/friendlyName.model";
  import type { ModeValue } from "../../models/capabilities/smart-home-generics/modeValue.model";

  export let modeValues: Array<ModeValue>;

  function removeModeValue(i) {}
</script>

{#if modeValues.length > 0}
  <table>
    <thead>
      <tr>
        <th>Mode Value</th>
        <th>Friendly Names</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#each modeValues as mode, i}
        <tr>
          <td>{mode.value}</td>
          <td
            >{#each mode.friendlyNames as friendlyName}
              {#if friendlyName.type === FriendlyNameTypes.Text}
                {friendlyName.text} [{friendlyName.locale}]
              {/if}
              {#if friendlyName.type === FriendlyNameTypes.Asset}
                Asset: {friendlyName.assetId}
              {/if}
            {/each}</td
          >
          <td>
            <a
              href="#!"
              class="waves-effect waves-teal btn-flat"
              on:click={() => removeModeValue({ i })}>Remove</a
            >
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
