<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let operations: { name: string; isEnabled: boolean }[];

  const dispatch = createEventDispatcher();

  $: {
    operations;
    dispatch("updated");
  }
</script>

<div class="row">
  {#each operations as operation}
    <div class="col s3">
      <label>
        <input
          type="checkbox"
          class="filled-in"
          bind:checked={operation.isEnabled}
        />
        <span>{operation.name}</span>
      </label>
    </div>
  {/each}
</div>
