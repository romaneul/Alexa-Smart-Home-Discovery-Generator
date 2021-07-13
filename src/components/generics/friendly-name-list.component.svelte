<script lang="ts">
  import {
    FriendlyName,
    FriendlyNameTypes,
  } from "../../models/capabilities/smart-home-generics/friendlyName.model";
  import { createEventDispatcher } from "svelte";
  export let friendlyNames: Array<FriendlyName>;

  const dispatch = createEventDispatcher();

  function removeFriendlyName(i) {
    dispatch("friendly-name-removed", i);
  }
</script>

<div class="friendly-name-list">
  {#each friendlyNames as friendlyName, index}
    <div class="chip">
      {#if friendlyName.type === FriendlyNameTypes.Text}
        {friendlyName.text} [{friendlyName.locale}]
      {/if}
      {#if friendlyName.type === FriendlyNameTypes.Asset}
        Asset: {friendlyName.assetId}
      {/if}
      <i
        class="close-icon material-icons"
        on:click={() => removeFriendlyName(index)}>close</i
      >
    </div>
  {/each}
</div>

<style>
  .close-icon {
    cursor: pointer;
    float: right;
    font-size: 16px;
    line-height: 32px;
    padding-left: 8px;
  }
  .friendly-name-list {
    margin-top: 10px;
  }
</style>
