<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import { DisplayCategories } from "../models/displayCategories.enum";
  import type { Endpoint } from "../models/endpoint.model";
  export let endpoint: Endpoint;
  import AlexaCapability from "./AlexaCapability.svelte";
  import { CapabilityFactory } from "../models/capabilities/capabilityFactory";
  import M from "materialize-css";

  const viewConfig = {
    showAdditionalAttributes: false,
    showJson: true,
  };

  const allDisplayCategories = DisplayCategories;

  let alexaJson = {};

  function updateEndpoint() {
    alexaJson = endpoint.toAlexaDiscoveryResponseJson();
  }

  $: {
    alexaJson = endpoint.toAlexaDiscoveryResponseJson();
  }

  function addController(controllerName) {
    let newCapability = CapabilityFactory.getCapability(controllerName);
    endpoint.capabilities = [...endpoint.capabilities, newCapability];
  }

  function removeController(index) {
    const removed = endpoint.capabilities.splice(index, 1);
    endpoint.capabilities = endpoint.capabilities;
  }

  onMount(() => {
    initControls();
  });

  function initControls() {
    // Initialize Materialize Elemets
    M.updateTextFields();

    const select = document.querySelectorAll("select");
    M.FormSelect.init(select);

    const elems = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elems);

    const dropdowns = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(dropdowns, { constrainWidth: false });
  }
</script>

<div class="row">
  <div
    class="col"
    class:s7={viewConfig.showJson}
    class:s12={!viewConfig.showJson}
  >
    <!-- Header -->
    <div class="row">
      <h5>Endpoint Header</h5>
      <div class="input-field col s3">
        <input
          autocomplete="off"
          placeholder=""
          id="endpointId"
          type="text"
          class="validate"
          bind:value={endpoint.endpointId}
        />
        <label for="endpointId">Endpoint ID</label>
      </div>
      <div class="input-field col s3">
        <input
          autocomplete="off"
          placeholder=""
          id="endpointId"
          type="text"
          class="validate"
          bind:value={endpoint.friendlyName}
        />
        <label for="endpointId">Friendly Name</label>
      </div>
      <div class="input-field col s3">
        <input
          autocomplete="off"
          placeholder=""
          id="endpointId"
          type="text"
          class="validate"
          bind:value={endpoint.description}
        />
        <label for="endpointId">Description</label>
      </div>
      <div class="input-field col s3">
        <input
          autocomplete="off"
          placeholder=""
          id="endpointId"
          type="text"
          class="validate"
          bind:value={endpoint.manufacturerName}
        />
        <label for="endpointId">Manufactuer</label>
      </div>

      <!-- Display Category -->
      <div class="input-field col s12">
        <select multiple bind:value={endpoint.displayCategories}>
          {#each allDisplayCategories as dc}
            <option value={dc}>{dc}</option>
          {/each}
        </select>
        <label for="">Display Category</label>
      </div>

      <!-- Additional Attributes -->
      <div class="col s12">
        <a
          href="#!"
          on:click={() => {
            viewConfig.showAdditionalAttributes =
              !viewConfig.showAdditionalAttributes;
          }}>Toggle Additional Attributes</a
        >
      </div>

      {#if viewConfig.showAdditionalAttributes}
        <div class="input-field col s4">
          <input
            autocomplete="off"
            id="manufacturer"
            type="text"
            class="validate"
            bind:value={endpoint.manufacturer}
          />
          <label for="manufacturer">Manufacturer</label>
        </div>
        <div class="input-field col s4">
          <input
            autocomplete="off"
            id="model"
            type="text"
            class="validate"
            bind:value={endpoint.model}
          />
          <label for="model">Model</label>
        </div>
        <div class="input-field col s4">
          <input
            autocomplete="off"
            placeholder=""
            id="serialNumber"
            type="text"
            bind:value={endpoint.serialNumber}
          />
          <label for="serialNumber">Serial Number</label>
        </div>
        <div class="input-field col s4">
          <input
            autocomplete="off"
            placeholder=""
            id="firmwareVersion"
            type="text"
            class="validate"
            bind:value={endpoint.firmwareVersion}
          />
          <label for="firmwareVersion">Firmware Version</label>
        </div>
        <div class="input-field col s4">
          <input
            autocomplete="off"
            placeholder=""
            id="softwareVersion"
            type="text"
            class="validate"
            bind:value={endpoint.softwareVersion}
          />
          <label for="softwareVersion">Software Version</label>
        </div>
        <div class="input-field col s4">
          <input
            autocomplete="off"
            placeholder=""
            id="customIdentifier"
            type="text"
            class="validate"
            bind:value={endpoint.customIdentifier}
          />
          <label for="customIdentifier">Custom Identifier</label>
        </div>
      {/if}
    </div>

    <div class="row">
      <h5>Add Controller</h5>
      <!-- Dropdown Trigger -->
      <a
        class="dropdown-trigger btn-small blue "
        href="#!"
        data-target="dropdownSmartHome">Smart Home</a
      >
      <a
        class="dropdown-trigger btn-small blue"
        href="#!"
        data-target="dropdownGenerics">Generics</a
      >
      <a
        class="dropdown-trigger btn-small blue "
        href="#!"
        data-target="dropdownSecurity">Smart Home Securtiy</a
      >
      <a
        class="dropdown-trigger btn-small blue"
        href="#!"
        data-target="dropdownVideo"
      >
        Video
      </a>

      <!-- Dropdown Structure -->
      <ul id="dropdownSmartHome" class="dropdown-content">
        {#each CapabilityFactory.smartHomeController as controller}
          <li>
            <a
              href="#!"
              on:click={() => {
                addController(controller);
              }}>{controller}</a
            >
          </li>
        {/each}
      </ul>

      <ul id="dropdownGenerics" class="dropdown-content">
        {#each CapabilityFactory.genericController as controller}
          <li>
            <a
              href="#!"
              on:click={() => {
                addController(controller);
              }}>{controller}</a
            >
          </li>
        {/each}
      </ul>

      <ul id="dropdownSecurity" class="dropdown-content">
        {#each CapabilityFactory.smartHomeSecurityController as controller}
          <li>
            <a
              href="#!"
              on:click={() => {
                addController(controller);
              }}>{controller}</a
            >
          </li>
        {/each}
      </ul>

      <ul id="dropdownVideo" class="dropdown-content">
        {#each CapabilityFactory.videoController as controller}
          <li>
            <a
              href="#!"
              on:click={() => {
                addController(controller);
              }}>{controller}</a
            >
          </li>
        {/each}
      </ul>

      <!-- List Controller -->
      {#if endpoint.capabilities.length > 0}
        <ul class="collapsible">
          {#each endpoint.capabilities as name, index}
            <li>
              <div class="collapsible-header" style="display: block;">
                {endpoint.capabilities[index].alexaInterface}
                <span class="right">
                  <i
                    class="large material-icons"
                    on:click|stopPropagation={() => {
                      removeController(index);
                    }}>delete</i
                  >
                </span>
              </div>
              <div class="collapsible-body">
                <AlexaCapability
                  capability={endpoint.capabilities[index]}
                  on:updated={updateEndpoint}
                />
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
  {#if viewConfig.showJson}
    <div class="col s5">
      <pre>
      {JSON.stringify(alexaJson, null, 2)})
    </pre>
    </div>
  {/if}
</div>
