<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { SceneController } from "../../models/capabilities/smart-home/sceneController.model";
  export let capability: SceneController;

  const dispatch = createEventDispatcher();

  $: {
    capability.supportsDeactivation;
    dispatch("updated");
  }
</script>

<div class="row">
  <div class="col s12">
    <label>
      <input
        type="checkbox"
        class="filled-in"
        bind:checked={capability.supportsDeactivation}
      />
      <span>Supports Deactivation</span>
    </label>
  </div>
</div>
