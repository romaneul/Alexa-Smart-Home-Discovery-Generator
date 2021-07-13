<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let inputs: { name: string; isEnabled: boolean }[];

  const dispatch = createEventDispatcher();

  $: {
    inputs;
    dispatch("updated");
  }
</script>

<div class="row">
  {#each inputs as input}
    <div class="col s3">
      <label>
        <input
          type="checkbox"
          class="filled-in"
          bind:checked={input.isEnabled}
        />
        <span>{input.name}</span>
      </label>
    </div>
  {/each}
</div>
