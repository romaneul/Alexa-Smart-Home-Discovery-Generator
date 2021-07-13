<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import PresetListComponent from "./preset-list.component.svelte";
  import PresetEditComponent from "./preset-edit.component.svelte";
  import ActionMappingEditComponent from "./action-mapping-edit.component.svelte";
  import StateMappingEditComponent from "./state-mapping-edit.component.svelte";
  import ActionMappingListComponent from "./action-mapping-list.component.svelte";
  import StateMappingListComponent from "./state-mapping-list.component.svelte";
  import type { RangeController } from "../../models/capabilities/smart-home-generics/rangeController.model";
  import { Preset } from "../../models/capabilities/smart-home-generics/preset.model";
  import { AssetCatalog } from "../../models/capabilities/smart-home-generics/assetCatalog";
  import { ParentPrimitivesTypes } from "../../models/capabilities/smart-home-generics/semanticAnnotations.model";
  import M from "materialize-css";

  export let capability: RangeController;

  let preset: Preset;
  let showEditPreset = false;
  let showEditActionMapping = false;
  let showEditStateMapping = false;
  let unitsOfMeasure = AssetCatalog.getUnitsOfMeasurement();

  onMount(() => {
    M.updateTextFields();
    M.AutoInit();
  });

  function showPresetEdit() {
    showEditPreset = true;
    preset = new Preset();
  }

  function addNewPreset(e) {
    showEditPreset = false;
    capability.presets = [...capability.presets, e.detail];
  }

  function removePreset(i) {
    const remove = capability.presets.slice(i, 1);
    capability.presets = capability.presets;
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

<!-- Range Configuration -->
<div class="row">
  <div class="col s12">
    <h5>3. Range Config</h5>
  </div>
  <div class="col s12">
    <div class="row">
      <div class="input-field col s2">
        <input
          id="minimumValue"
          type="number"
          bind:value={capability.minimumValue}
        />
        <label for="minimumValue">Minimum</label>
      </div>
      <div class="input-field col s2">
        <input
          id="maximumValue"
          type="number"
          bind:value={capability.maximumValue}
        />
        <label for="maximumValue">Maximum</label>
      </div>
      <div class="input-field col s2">
        <input id="precision" type="number" bind:value={capability.precision} />
        <label for="precision">Precision</label>
      </div>
      <div class="input-field col s4">
        <select bind:value={capability.unitOfMeasure} id="unit">
          <option value="" disabled selected>(optional)</option>
          <option value="">None</option>
          {#each unitsOfMeasure as unit}
            <option value={unit}>{unit}</option>
          {/each}
        </select>
        <label for="unit">Unit of Measure</label>
      </div>
    </div>
  </div>
</div>

<!-- Presets-->
<div class="row">
  <div class="col s12">
    <h5>4. Create Presets (optional)</h5>
  </div>

  <div class="input-field col s2">
    <!-- svelte-ignore a11y-missing-attribute -->
    <a class="waves-effect waves-light btn-small" on:click={showPresetEdit}
      >New Preset</a
    >
  </div>

  <div class="col s12">
    {#if showEditPreset}
      <PresetEditComponent
        {preset}
        maximum={capability.maximumValue}
        minimum={capability.minimumValue}
        on:cancel={() => (showEditPreset = false)}
        on:add-reset={addNewPreset}
      />
    {/if}
  </div>

  <div class="col s12">
    <PresetListComponent presets={capability.presets} on:updated />
  </div>
</div>

<!-- Semantics -->
<div class="row">
  <div class="col s12">
    <h5>5. Add Semantics (optional)</h5>
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
        parentPrimitiveType={ParentPrimitivesTypes.Range}
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
      class="waves-effect waves-teal btn-small add-button"
      on:click={() => {
        showEditStateMapping = true;
      }}>Add State Mapping</a
    >
  </div>

  <div class="col s12">
    {#if showEditStateMapping}
      <StateMappingEditComponent
        parentPrimitiveType={ParentPrimitivesTypes.Range}
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
