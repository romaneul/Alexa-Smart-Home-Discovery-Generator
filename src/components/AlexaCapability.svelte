<script lang="ts">
  import type { CapabilityInterface } from "../models/capabilities/capabilityInterface.model";
  import InputControllerComponent from "./custom/InputController.component.svelte";
  import PlayackControllerComponent from "./custom/PlaybackController.component.svelte";
  import GenericControllerComponent from "./generics/GenericController.component.svelte";
  import ThermostatControllerComponent from "./custom/ThermostatController.component.svelte";
  import SceneControllerComponent from "./custom/SceneController.component.svelte";
  import { onMount, createEventDispatcher } from "svelte";
  import { InputController } from "../models/capabilities/video/inputController.model";
  import { PlaybackController } from "../models/capabilities/video/playbackController.model";
  import { PrimitiveInterface } from "../models/capabilities/smart-home-generics/genericsInterface.model";
  import { ThermostatController } from "../models/capabilities/smart-home/thermostatController.model";
  import { SceneController } from "../models/capabilities/smart-home/sceneController.model";
  import M from "materialize-css";
  export let capability: CapabilityInterface;

  onMount(() => {
    M.AutoInit();
    const dropdowns = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(dropdowns, { constrainWidth: false });
  });

  // Notfiy Endpoint
  const dispatch = createEventDispatcher();
  $: capability && dispatch("updated");
</script>

<!-- Proactively Reported & Retrievalbe -->

{#if capability.canReportState}
  <div class="row">
    <div class="col s3">
      <label>
        <input
          type="checkbox"
          class="filled-in"
          bind:checked={capability.retrievable}
        />
        <span>Retrievable</span>
      </label>
    </div>
    <div class="coll s3">
      <label>
        <input
          type="checkbox"
          class="filled-in"
          bind:checked={capability.proactivelyReported}
        />
        <span>Proactively Reported</span>
      </label>
    </div>
  </div>
{/if}

<!-- Supported Properties -->

<div class="row">
  {#each capability.properties as prop}
    <div class="col s3">
      <label>
        <input
          type="checkbox"
          class="filled-in"
          bind:checked={prop.isEnabled}
        />
        <span>{prop.propertyName}</span>
      </label>
    </div>
  {/each}
</div>

{#if capability instanceof InputController}
  <InputControllerComponent inputs={capability.inputs} on:updated />
{/if}

{#if capability instanceof PlaybackController}
  <PlayackControllerComponent operations={capability.operations} on:updated />
{/if}

{#if capability instanceof ThermostatController}
  <ThermostatControllerComponent {capability} on:updated />
{/if}

{#if capability instanceof SceneController}
  <SceneControllerComponent {capability} on:updated />
{/if}

<!-- Generic Controllers-->
{#if capability instanceof PrimitiveInterface}
  <GenericControllerComponent {capability} on:updated />
{/if}
