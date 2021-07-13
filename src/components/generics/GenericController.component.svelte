<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { RangeController } from "../../models/capabilities/smart-home-generics/rangeController.model";
  import type { PrimitiveInterface } from "../../models/capabilities/smart-home-generics/genericsInterface.model";

  import FriendlyNameComponent from "./friendly-name-add.component.svelte";
  import FriendlyNameListComponent from "./friendly-name-list.component.svelte";

  import RangeControllerComponent from "./RangeController.componennt.svelte";
  import ModeControllerComponent from "./ModeController.compontent.svelte";
  import { ModeController } from "../../models/capabilities/smart-home-generics/modeController.model";

  export let capability: PrimitiveInterface;
  let showEditFriendlyName = false;

  function addFriendlyName(e) {
    capability.friendlyNames = [...capability.friendlyNames, e.detail];
    showEditFriendlyName = false;
  }

  function removeFriendlyName(e) {
    const removed = capability.friendlyNames.splice(e.detail, 1);
    capability.friendlyNames = capability.friendlyNames;
  }

  const dispatch = createEventDispatcher();
  $: capability && dispatch("updated");
</script>

<div class="row">
  <div class="col s12">
    <h5>1. Instance ID</h5>
  </div>
  <div class="input-field col s6">
    <input
      id="instance_ide"
      type="text"
      bind:value={capability.instance}
      autocomplete="off"
    />
    <label for="instance_ide">Instance ID</label>
  </div>
</div>

<div class="row">
  <div class="col s12">
    <h5>2. Add Friendly Name for Instance</h5>
  </div>
  <div class="col s12">
    <a
      href="#!"
      class="waves-effect waves-teal btn-small"
      on:click={() => {
        showEditFriendlyName = true;
      }}>Add Friendly Name</a
    >
  </div>

  <div class="col s12">
    {#if showEditFriendlyName}
      <FriendlyNameComponent on:friendly-name-added={addFriendlyName} />
    {/if}
  </div>

  <div class="col s12">
    <FriendlyNameListComponent
      friendlyNames={capability.friendlyNames}
      on:friendly-name-removed={removeFriendlyName}
    />
  </div>
</div>

{#if capability instanceof RangeController}
  <RangeControllerComponent {capability} on:updated />
{/if}

{#if capability instanceof ModeController}
  <ModeControllerComponent {capability} on:updated />
{/if}
