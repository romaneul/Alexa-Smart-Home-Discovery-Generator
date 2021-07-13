<script lang="ts">
  import { onMount, afterUpdate, createEventDispatcher } from "svelte";
  import M from "materialize-css";
  import { AssetCatalog } from "../../models/capabilities/smart-home-generics/assetCatalog";
  import { Locales } from "../../models/capabilities/smart-home-generics/locales";
  import {
    FriendlyName,
    FriendlyNameTypes,
  } from "../../models/capabilities/smart-home-generics/friendlyName.model";

  const assets = AssetCatalog.getAssetCatalog();
  const locales = Locales.getLocales();
  const dispatch = createEventDispatcher();

  let selectedFriendlyNameType: FriendlyNameTypes = FriendlyNameTypes.Text;
  let friendlyName = "";
  let selectedLocale = "";
  let selectedAssetId;

  function addCustomFriendlyName() {
    let fn = new FriendlyName(FriendlyNameTypes.Text);
    fn.setCustomFriendlyName(friendlyName, selectedLocale);
    dispatch("friendly-name-added", fn);
    friendlyName = "";
    selectedLocale = "";
  }

  function addAsset() {
    let fn = new FriendlyName(FriendlyNameTypes.Asset);
    fn.setAssetId(selectedAssetId);
    dispatch("friendly-name-added", fn);
    selectedAssetId = "";
  }

  onMount(() => {
    const dropdowns = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(dropdowns, { constrainWidth: false });
  });

  afterUpdate(() => {
    M.AutoInit();
    const dropdowns = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(dropdowns, { constrainWidth: false });
  });
</script>

<div class="row">
  <div class="input-field col s2">
    <label>
      <input
        bind:group={selectedFriendlyNameType}
        type="radio"
        value={FriendlyNameTypes.Text}
      />
      <span>Text</span>
    </label>
  </div>
  <div class="input-field col s2">
    <label>
      <input
        bind:group={selectedFriendlyNameType}
        type="radio"
        value={FriendlyNameTypes.Asset}
      />
      <span>Asset</span>
    </label>
  </div>
</div>

<div class="row">
  {#if selectedFriendlyNameType === FriendlyNameTypes.Text}
    <div class="input-field col s4">
      <input
        id="friendly_name"
        type="text"
        autocomplete="off"
        bind:value={friendlyName}
      />
      <label for="friendly_name">Friendly Name</label>
    </div>
    <div class="input-field col s4">
      <select bind:value={selectedLocale}>
        <option value="" disabled selected>Choose Locale</option>
        {#each locales as locale}
          <option value={locale}>{locale}</option>
        {/each}
      </select>
    </div>
    <div class="input-field col s1">
      <!-- svelte-ignore a11y-missing-attribute -->
      <a
        class="waves-effect waves-light btn"
        on:click={addCustomFriendlyName}
        class:disabled={!friendlyName || !selectedLocale}>Add</a
      >
    </div>
  {/if}

  {#if selectedFriendlyNameType === FriendlyNameTypes.Asset}
    <div class="input-field col s4">
      <select bind:value={selectedAssetId}>
        <option value="" disabled selected>Choose Asset</option>
        {#each assets as asset}
          <option value={asset.assetIdentifier}
            >{asset.assetIdentifier}
          </option>
        {/each}
      </select>
    </div>
    <div class="input-field col s1">
      <!-- svelte-ignore a11y-missing-attribute -->
      <a
        class="waves-effect waves-light btn"
        on:click={addAsset}
        class:disabled={!selectedAssetId}>Add</a
      >
    </div>
  {/if}
</div>
