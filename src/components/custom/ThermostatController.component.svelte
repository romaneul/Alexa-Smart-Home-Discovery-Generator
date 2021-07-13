<script lang="ts">
  export let capability: ThermostatController;
  import { createEventDispatcher } from "svelte";
  import type { ThermostatController } from "../../models/capabilities/smart-home/thermostatController.model";

  const dispatch = createEventDispatcher();

  const i = capability.indexOfThermostatMode;

  // Notify parent components that state has changed
  $: {
    capability.supportedModes;
    capability.supportsScheduling;
    dispatch("updated");
  }
</script>

<div class="row">
  <div class="col s1">Modes:</div>
  {#each capability.supportedModes as supportedMode}
    <div class="col s2">
      <label>
        <input
          type="checkbox"
          class="filled-in"
          bind:checked={supportedMode.isEnabled}
          disabled={!capability.properties[i].isEnabled}
        />
        <span>{supportedMode.name}</span>
      </label>
    </div>
  {/each}
</div>

<div class="row">
  <div class="col s9">
    <label>
      <input
        type="checkbox"
        class="filled-in"
        bind:checked={capability.supportsScheduling}
      />
      <span>Supports Scheduling</span>
    </label>
  </div>
</div>
