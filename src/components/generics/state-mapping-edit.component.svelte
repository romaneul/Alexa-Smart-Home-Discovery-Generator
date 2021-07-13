<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import type { ModeValue } from "../../models/capabilities/smart-home-generics/modeValue.model";
  import { ParentPrimitivesTypes } from "../../models/capabilities/smart-home-generics/semanticAnnotations.model";
  import { StateMapping } from "../../models/capabilities/smart-home-generics/stateMapping.model";
  import M from "materialize-css";

  export let parentPrimitiveType: ParentPrimitivesTypes;
  export let modeValues: Array<ModeValue> = [];

  const modeValueStrings = modeValues.map((mode) => mode.value);

  let stateMapping = new StateMapping(parentPrimitiveType);
  const availableStates = StateMapping.getStates();

  const dispatch = createEventDispatcher();

  onMount(() => {
    M.AutoInit();
    const dropdowns = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(dropdowns, { constrainWidth: false });
  });

  function cancel() {
    dispatch("cancel");
  }

  function addActionMapping() {
    dispatch("state-mapping-added", stateMapping);
  }
</script>

<div class="card ">
  <div class="card-content ">
    <div class="row">
      <div class="input-field col s4">
        <select multiple bind:value={stateMapping.states}>
          <option value="" disabled selected>Select State</option>
          {#each availableStates as states}
            <option value={states}>{states}</option>
          {/each}
        </select>
        <label for="">State</label>
      </div>

      {#if parentPrimitiveType === ParentPrimitivesTypes.Range}
        <div class="input-field col s4">
          <select bind:value={stateMapping.isRange}>
            <option value={true}>Range </option>
            <option value={false} selected>Discrete value</option>
          </select>
          <label for="">Map To</label>
        </div>
        {#if stateMapping.isRange}
          <div class="input-field col s2">
            <input
              id="min"
              type="number"
              bind:value={stateMapping.minimumValue}
            />
            <label for="min">Min</label>
          </div>
          <div class="input-field col s2">
            <input
              id="max"
              type="number"
              bind:value={stateMapping.maximumValue}
            />
            <label for="max">Max</label>
          </div>
        {/if}
        {#if !stateMapping.isRange}
          <div class="input-field col s3">
            <input
              id="range_value"
              type="number"
              bind:value={stateMapping.rangeValue}
            />
            <label for="range_value"> Range Value</label>
          </div>
        {/if}
      {/if}
      {#if parentPrimitiveType === ParentPrimitivesTypes.Mode}
        <div class="input-field col s3">
          <select bind:value={stateMapping.modeValue}>
            <option value="" disabled selected>Select Modes</option>
            {#each modeValueStrings as modeValue}
              <option value={modeValue}>{modeValue}</option>
            {/each}
          </select>
        </div>
      {/if}
    </div>
  </div>
  <div class="card-action">
    <!-- svelte-ignore a11y-missing-attribute -->
    <a on:click={cancel} class="waves-effect  btn-small">Cancel</a>

    <!-- svelte-ignore a11y-missing-attribute -->
    <a on:click={addActionMapping} class="waves-effect waves-teal btn-small"
      >Add Action Mapping</a
    >
  </div>
</div>
