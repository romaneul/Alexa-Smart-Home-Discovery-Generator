<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import { FriendlyNameTypes } from "../../models/capabilities/smart-home-generics/friendlyName.model";
  import type { Preset } from "../../models/capabilities/smart-home-generics/preset.model";

  export let presets: Array<Preset>;

  const dispatch = createEventDispatcher();

  function removePreset(i) {
    const removed = presets.splice(i, 1);
    presets = presets;
    dispatch("updated");
  }
</script>

{#if presets.length > 0}
  <table>
    <thead>
      <tr>
        <th>Preset</th>
        <th>Friendly Names</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#each presets as preset, i}
        <tr>
          <td>{preset.presetValue}</td>
          <td
            >{#each preset.friendlyNames as friendlyName}
              {#if friendlyName.type === FriendlyNameTypes.Text}
                {friendlyName.text} [{friendlyName.locale}]
              {/if}
              {#if friendlyName.type === FriendlyNameTypes.Asset}
                Asset: {friendlyName.assetId}
              {/if}
            {/each}</td
          >
          <td>
            <a href="#!" on:click={() => removePreset({ i })}>
              <i
                class=" material-icons"
                on:click|stopPropagation={() => {
                  removePreset(i);
                }}>delete</i
              >
            </a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
