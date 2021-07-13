<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import { ActionMapping } from "../../models/capabilities/smart-home-generics/actionMapping.model";
  import type { ModeValue } from "../../models/capabilities/smart-home-generics/modeValue.model";
  import { ParentPrimitivesTypes } from "../../models/capabilities/smart-home-generics/semanticAnnotations.model";
  import M from "materialize-css";

  export let parentPrimitiveType: ParentPrimitivesTypes;
  export let modeValues: Array<ModeValue> = [];

  const modeValueStrings = modeValues.map((mode) => mode.value);

  let actionMapping = new ActionMapping(parentPrimitiveType);
  let availableActions = actionMapping.getActions();
  let availalbeDirectives = actionMapping.getDirectives();

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
    dispatch("action-mapping-added", actionMapping);
  }
</script>

<div class="card ">
  <div class="card-content ">
    <div class="row">
      <div class="input-field col s5">
        <select multiple bind:value={actionMapping.actions}>
          <option value="" disabled selected>Select Action</option>
          {#each availableActions as action}
            <option value={action}>{action}</option>
          {/each}
        </select>
        <label for="">Action</label>
      </div>
      <div class="input-field col s4">
        <select bind:value={actionMapping.directive}>
          <option value="" disabled selected>Select Directive</option>
          {#each availalbeDirectives as directive}
            <option value={directive}>{directive}</option>
          {/each}
        </select>
        <label for="">Map Directive</label>
      </div>
      {#if parentPrimitiveType === ParentPrimitivesTypes.Range}
        <div class="input-field col s3">
          {#if actionMapping.directive === "SetRangeValue"}
            <input
              id="range_value"
              type="number"
              bind:value={actionMapping.rangeValue}
            />
            <label for="range_value">Range Value</label>
          {/if}
          {#if actionMapping.directive === "AdjustRangeValue"}
            <input
              id="range_value_delta"
              type="number"
              bind:value={actionMapping.rangeValueDelta}
            />
            <label for="range_value_delta">Range Delta</label>
          {/if}
        </div>
      {/if}
      {#if parentPrimitiveType === ParentPrimitivesTypes.Mode}
        <div class="input-field col s3">
          <select bind:value={actionMapping.modeValue}>
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
