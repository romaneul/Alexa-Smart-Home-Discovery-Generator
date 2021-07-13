<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { ModeController } from "../../models/capabilities/smart-home-generics/modeController.model";
  import { ModeValue } from "../../models/capabilities/smart-home-generics/modeValue.model";
  import { ParentPrimitivesTypes } from "../../models/capabilities/smart-home-generics/semanticAnnotations.model";
  import ModeValueEditComponent from "./mode-value-edit.component.svelte";
  import ModeValueListComponent from "./mode-value-list.component.svelte";
  import StateMappingEditComponent from "./state-mapping-edit.component.svelte";
  import StateMappingListComponent from "./state-mapping-list.component.svelte";
  import ActionMappingEditComponent from "./action-mapping-edit.component.svelte";
  import ActionMappingListComponent from "./action-mapping-list.component.svelte";
  import M from "materialize-css";

  export let capability: ModeController;

  let modeValue: ModeValue;
  let showEditModeValue = false;
  let showEditActionMapping = false;
  let showEditStateMapping = false;

  onMount(() => {
    M.AutoInit();
    M.updateTextFields();
  });

  function showModeValueEdit() {
    showEditModeValue = true;
    modeValue = new ModeValue();
  }

  function addNewModeValue(e) {
    showEditModeValue = false;
    capability.supportedModes = [...capability.supportedModes, e.detail];
  }

  function removeModeValue(i) {
    const remove = capability.supportedModes.slice(i, 1);
    capability.supportedModes = capability.supportedModes;
  }

  function addActionMapping(e) {
    showEditActionMapping = false;
    capability.actionMappings = [...capability.actionMappings, e.detail];
  }

  function addStateMapping(e) {
    showEditStateMapping = false;
    capability.stateMappings = [...capability.stateMappings, e.detail];
  }

  const dispatch = createEventDispatcher();
  $: capability && dispatch("updated");
</script>

<!-- Mode Configuration -->
<div class="row">
  <div class="col s12">
    <h5>3. Add Mode Values</h5>
  </div>

  <div class="col s12">
    <label>
      <input
        type="checkbox"
        class="filled-in"
        bind:checked={capability.ordered}
      />
      <span>Mode values are ordered</span>
    </label>
  </div>

  <div class="input-field col s2">
    <!-- svelte-ignore a11y-missing-attribute -->
    <a class="waves-effect waves-light btn-small" on:click={showModeValueEdit}
      >New Mode Value</a
    >
  </div>

  <div class="col s12">
    {#if showEditModeValue}
      <ModeValueEditComponent
        {modeValue}
        on:cancel={() => (showEditModeValue = false)}
        on:add-mode-value={addNewModeValue}
      />
    {/if}
  </div>

  <div class="col s12">
    <ModeValueListComponent modeValues={capability.supportedModes} />
  </div>
</div>

<!-- Semantics -->
<div class="row">
  <div class="col s12">
    <h5>4. Add Semantics (optional)</h5>
  </div>

  <!-- Action Mappings -->
  <div class="col s4">
    <a
      href="#!"
      class="waves-effect waves-teal btn-small add-button"
      on:click={() => {
        showEditActionMapping = true;
      }}>Add Action Mapping</a
    >
  </div>

  <div class="col s12">
    {#if showEditActionMapping}
      <ActionMappingEditComponent
        modeValues={capability.supportedModes}
        parentPrimitiveType={ParentPrimitivesTypes.Mode}
        on:cancel={() => {
          showEditActionMapping = false;
        }}
        on:action-mapping-added={addActionMapping}
      />
    {/if}
  </div>

  <div class="col s12">
    <ActionMappingListComponent actionMappings={capability.actionMappings} />
  </div>

  <!-- State Mappings -->
  <div class="col s4">
    <a
      href="#!"
      class="waves-effect waves-teal btn-small add-button "
      on:click={() => {
        showEditStateMapping = true;
      }}>Add State Mapping</a
    >
  </div>

  <div class="col s12">
    {#if showEditStateMapping}
      <StateMappingEditComponent
        modeValues={capability.supportedModes}
        parentPrimitiveType={ParentPrimitivesTypes.Mode}
        on:cancel={() => (showEditStateMapping = false)}
        on:state-mapping-added={addStateMapping}
      />
    {/if}
  </div>

  <div class="col s12">
    <StateMappingListComponent stateMappings={capability.stateMappings} />
  </div>
</div>

<style>
  .add-button {
    width: 100%;
    margin-bottom: 20px;
  }
</style>
