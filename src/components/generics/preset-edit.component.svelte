<script lang="ts">
  import FriendlyNameAddComponent from "./friendly-name-add.component.svelte";
  import FriendlyNameListComponent from "./friendly-name-list.component.svelte";
  import { onMount, createEventDispatcher } from "svelte";
  import M from "materialize-css";
  import type { Preset } from "../../models/capabilities/smart-home-generics/preset.model";

  const dispatch = createEventDispatcher();

  export let preset: Preset;
  export let minimum: number;
  export let maximum: number;

  onMount(() => {
    M.AutoInit();
  });

  function cancel() {
    dispatch("cancel");
  }

  function addPreset() {
    dispatch("add-reset", preset);
  }

  function addFriendlyName(e) {
    preset.friendlyNames = [...preset.friendlyNames, e.detail];
  }

  function removeFriendlyName(e) {
    const removed = preset.friendlyNames.splice(e.detail, 1);
    preset.friendlyNames = preset.friendlyNames;
  }
</script>

<div class="row">
  <div class="col s12">
    <div class="card">
      <div class="card-content ">
        <!-- Preset Value -->
        <h6>Select Preset Value:</h6>
        <div class="row">
          <div class="col s5">
            <input
              placeholder="Value between {minimum} and {maximum}"
              id="preset_value"
              type="number"
              bind:value={preset.presetValue}
            />
            <label for="preset_value">Preset Value</label>
          </div>
        </div>
        <!-- Friendly Names for Preset -->
        <h6>Attach Friendly Names:</h6>
        <FriendlyNameAddComponent on:friendly-name-added={addFriendlyName} />
        <FriendlyNameListComponent
          friendlyNames={preset.friendlyNames}
          on:friendly-name-removed={removeFriendlyName}
        />
      </div>
      <div class="card-action">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a on:click={cancel} class="waves-effect  btn-small">Cancel</a>

        <!-- svelte-ignore a11y-missing-attribute -->
        <a on:click={addPreset} class="waves-effect waves-teal btn-small"
          >Add Preset</a
        >
      </div>
    </div>
  </div>
</div>
