<script lang="ts">
  import { v4 as uuidv4 } from "uuid";
  import { Endpoint } from "../models/endpoint.model";
  import AlexaEndpoint from "../components/AlexaEndpoint.svelte";
  import { onMount } from "svelte";
  import type { CapabilityInterface } from "../models/capabilities/capabilityInterface.model";
  import M from "materialize-css";

  let selectedEndpoint: Endpoint;
  let newEndpoint: Endpoint;
  let endpoints: Array<Endpoint> = [];
  let textareaImportEndpoints: string;
  let modalDialogImport;
  let modalDialogExport;
  let discoveryJsonExport = "";

  onMount(() => {
    loadEndpoints();
    // Inititalize Modal Dialog
    const importModal = document.querySelector("#import");
    modalDialogImport = M.Modal.init(importModal);

    const exportModal = document.querySelector("#export");
    modalDialogExport = M.Modal.init(exportModal);
  });

  function importEndpoints() {
    try {
      const discoveryJson = JSON.parse(textareaImportEndpoints);
      const endpointsArray = discoveryJson.event.payload.endpoints;
      endpointsArray.forEach((endpointJson) => {
        const importedEndpoint = Endpoint.fromJson(endpointJson);
        endpoints = [...endpoints, importedEndpoint];
      });
      modalDialogImport.close();
      storeEndpoints();
    } catch (error) {
      // Todo: Add UI for error message
      console.log("error", error);
    }
  }

  function generateDiscoveryEvent() {
    const ep = endpoints.map((endpoint) => {
      return endpoint.toAlexaDiscoveryResponseJson();
    });

    const proactiveDiscoveryEvent = {
      event: {
        header: {
          namespace: "Alexa.Discovery",
          name: "AddOrUpdateReport",
          payloadVersion: "3",
          messageId: uuidv4(),
        },
        payload: {
          endpoints: ep,
          scope: {
            type: "BearerToken",
            token: "access-token-from-Amazon",
          },
        },
      },
    };

    discoveryJsonExport = JSON.stringify(proactiveDiscoveryEvent, null, 2);
  }

  // https://stackoverflow.com/questions/33855641/copy-output-of-a-javascript-variable-to-the-clipboard
  function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    var dialog = document.querySelector("#export");
    dialog.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    dialog.removeChild(dummy);
  }

  function storeEndpoints() {
    let storageObject = [];
    endpoints.forEach((endpoint) => {
      storageObject.push(endpoint.toAlexaDiscoveryResponseJson());
    });

    localStorage.setItem("endpoints", JSON.stringify(storageObject));
  }

  function loadEndpoints() {
    endpoints = [];
    const endpointsString = localStorage.getItem("endpoints");
    if (!endpointsString) {
      return;
    }
    const endpointsArray = JSON.parse(endpointsString);
    endpointsArray.forEach((endpointJson) => {
      const importedEndpoint = Endpoint.fromJson(endpointJson);
      endpoints = [...endpoints, importedEndpoint];
    });
  }

  function addNewEndpoint() {
    selectedEndpoint = null;
    newEndpoint = new Endpoint();
  }

  function editEndpoint(index) {
    selectedEndpoint = endpoints[index];
  }

  function deleteEndpoint(index) {
    const removedEndpoint = endpoints.splice(index, 1);
    endpoints = endpoints;
    storeEndpoints();
  }

  function cancelEditEndpoint() {
    selectedEndpoint = null;
    newEndpoint = null;
    loadEndpoints();
  }

  function saveEditedEndpoint() {
    endpoints = [...endpoints];
    selectedEndpoint = null;
    storeEndpoints();
  }

  function saveNewEndpoint() {
    endpoints = [...endpoints, newEndpoint];
    newEndpoint = null;
    storeEndpoints();
  }

  function getCapabilitiesString(capability: Array<CapabilityInterface>) {
    return capability.map((capability) => capability.alexaInterface).join(" ");
  }
</script>

<div class="container">
  <div class="row" />

  <!-- Add Buttons -->
  <div class="row">
    <a class="waves-effect waves-light btn" href="#!" on:click={addNewEndpoint}
      ><i class="material-icons left">add_circle</i>Endpoint</a
    >
    <a class="waves-effect waves-light btn modal-trigger" href="#import"
      ><i class="material-icons left">file_download</i>Import Discovery Event</a
    >

    <a
      class="waves-effect waves-light btn modal-trigger right"
      href="#export"
      on:click={generateDiscoveryEvent}
      ><i class="material-icons left">file_upload</i>Generate Discovery Event</a
    >

    <!-- Endpoint List -->
    {#if endpoints.length > 0}
      <div class="row">
        <table class="bordered">
          <thead>
            <tr>
              <th>Friendly Name</th>
              <th>Display Category</th>
              <th>Controller</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {#each endpoints as endpoint, index}
              <tr>
                <td>{endpoint.friendlyName}</td>
                <td>{endpoint.displayCategories}</td>
                <td>{getCapabilitiesString(endpoint.capabilities)}</td>
                <td>
                  <a
                    href="#!"
                    on:click={() => {
                      editEndpoint(index);
                    }}><i class="material-icons">edit</i></a
                  >
                  <a
                    href="#!"
                    on:click={() => {
                      deleteEndpoint(index);
                    }}><i class="material-icons">delete</i></a
                  >
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <p>
        <i class=" material-icons">arrow_upward</i>No Alexa Smart Home
        Endpoints. Import a Discovery Event or add Endpoints manually
      </p>
    {/if}

    <!-- Modal Structure for Discovery Import -->
    <div id="import" class="modal modal-fixed-footer">
      <div class="modal-content">
        <div class="input-field col s12">
          <textarea
            id="textarea"
            class="materialize-textarea"
            style="height: 100%"
            bind:value={textareaImportEndpoints}
          />
          <label for="textarea">Paste Discovery JSON</label>
        </div>
      </div>
      <div class="modal-footer">
        <a
          href="#!"
          class=" waves-effect waves-green btn-flat"
          on:click={importEndpoints}>Import</a
        >
      </div>
    </div>

    <!-- Modal Structure for Discovery Export -->
    <div id="export" class="modal modal-fixed-footer">
      <div class="modal-content">
        <pre>
              {discoveryJsonExport}
            </pre>
      </div>
      <div class="modal-footer">
        <a
          href="#!"
          class=" waves-effect waves-green btn-flat"
          on:click={() => {
            copyToClipboard(discoveryJsonExport);
          }}>Copy</a
        >
      </div>
    </div>
  </div>

  <!-- Edit Endpoint View -->
  {#if selectedEndpoint || newEndpoint}
    <div class="row detail-view">
      <div class="divider" />
      {#if selectedEndpoint}
        <h4>Edit Endpoint</h4>
        <a
          class="waves-effect waves-light btn"
          href="#!"
          on:click={saveEditedEndpoint}
          ><i class="material-icons left">save</i>Save</a
        >
        <a
          class="waves-effect waves-light btn"
          href="#!"
          on:click={cancelEditEndpoint}>Cancel</a
        >
        <AlexaEndpoint endpoint={selectedEndpoint} />
      {/if}
      {#if newEndpoint}
        <h4>Add new Endpoint</h4>
        <a
          class="waves-effect waves-light btn"
          href="#!"
          on:click={saveNewEndpoint}
          ><i class="material-icons left">save</i>Save</a
        >
        <a
          class="waves-effect waves-light btn"
          href="#!"
          on:click={cancelEditEndpoint}>Cancel</a
        >
        <AlexaEndpoint endpoint={newEndpoint} />
      {/if}
    </div>
  {/if}
</div>

<style>
  .detail-view {
    margin-top: 100px;
  }
</style>
