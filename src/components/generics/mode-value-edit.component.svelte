<script lang="ts">
  import FriendlyNameAddComponent from "./friendly-name-add.component.svelte";
  import FriendlyNameListComponent from "./friendly-name-list.component.svelte";
  import { onMount, createEventDispatcher } from "svelte";
  import M from "materialize-css";
  import type { ModeValue } from "../../models/capabilities/smart-home-generics/modeValue.model";

  const dispatch = createEventDispatcher();

  export let modeValue: ModeValue;

  onMount(() => {
    M.AutoInit();
  });

  function cancel() {
    dispatch("cancel");
  }

  function addModeValue() {
    dispatch("add-mode-value", modeValue);
  }

  function addFriendlyName(e) {
    modeValue.friendlyNames = [...modeValue.friendlyNames, e.detail];
  }

  function removeFriendlyName(e) {
    const removed = modeValue.friendlyNames.splice(e.detail, 1);
    modeValue.friendlyNames = modeValue.friendlyNames;
  }
</script>

<div class="row">
  <div class="col s12">
    <div class="card">
      <div class="card-content ">
        <!-- Mode Value -->
        <h6>Mode Value</h6>
        <div class="row">
          <div class="col s5">
            <input
              placeholder="Set Mode value, e.g. 'WashCycle.Normal'"
              id="mode_value"
              type="text"
              bind:value={modeValue.value}
            />
            <label for="mode_value">Mode Value</label>
          </div>
        </div>
        <!-- Friendly Names for Mode -->
        <h6>Attach Friendly Names:</h6>
        <FriendlyNameAddComponent on:friendly-name-added={addFriendlyName} />
        <FriendlyNameListComponent
          friendlyNames={modeValue.friendlyNames}
          on:friendly-name-removed={removeFriendlyName}
        />
      </div>
      <div class="card-action">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a on:click={cancel} class="waves-effect  btn-small">Cancel</a>

        <!-- svelte-ignore a11y-missing-attribute -->
        <a on:click={addModeValue} class="waves-effect waves-teal btn-small"
          >Add Mode</a
        >
      </div>
    </div>
  </div>
</div>
