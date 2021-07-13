import { CapabilityFactory } from "./capabilities/capabilityFactory";
import type { CapabilityInterface } from "./capabilities/capabilityInterface.model";
import { PrimitiveInterface } from "./capabilities/smart-home-generics/genericsInterface.model";

export class Endpoint {
  isDiscoverable: Boolean;
  isCustom: Boolean;

  // Main header fields
  endpointId = "";
  manufacturerName = "";
  description = "";
  friendlyName = "";

  //Additional Attributes
  manufacturer: string;
  model: string;
  serialNumber: string;
  firmwareVersion: string;
  softwareVersion: string;
  customIdentifier: string;

  cookie = {};

  displayCategories: [] = [];
  capabilities: CapabilityInterface[] = [];
  connections = [];

  static fromJson(json) {
    const endpoint = new Endpoint();
    endpoint.friendlyName = json.friendlyName;
    endpoint.description = json.description;
    endpoint.manufacturerName = json.manufacturerName;
    endpoint.endpointId = json.endpointId;
    endpoint.displayCategories = json.displayCategories;

    json.capabilities.forEach((capabilityJson) => {
      let cap = CapabilityFactory.getCapability(capabilityJson.interface);
      cap.fromJson(capabilityJson);
      endpoint.capabilities = [...endpoint.capabilities, cap];
    });

    return endpoint;
  }

  constructor() {}

  public addCapability(capabilityName) {
    let newCapability = CapabilityFactory.getCapability(capabilityName);
    this.capabilities = [...this.capabilities, newCapability];
  }

  public removeCapability(capabilityName) {
    let i = this.capabilities.findIndex(
      (capability) => capability.alexaInterface === capabilityName
    );
    this.capabilities.splice(i, 1);
  }

  public setDisplayCategories(displayCategories) {
    this.displayCategories = displayCategories;
  }

  // Get all Capabilities
  public getAllCapabilities() {
    return this.capabilities;
  }

  // Get list of capabilities
  public getCapabilities() {
    return this.capabilities.filter((capability) => {
      if (!this.isPrimitive(capability)) {
        return capability;
      }
    });
  }

  // Get list of capabilities
  public getPrimitives() {
    return this.capabilities.filter((capability) => {
      if (this.isPrimitive(capability)) {
        return capability;
      }
    });
  }

  // Get string representation of the endpoint's all capabilities (capabilities + primitives)
  public getAllCapabilitiesAsString() {
    let allCapabilities = this.getAllCapabilities();
    return allCapabilities.map((capability) => capability.alexaInterface);
  }

  // Get string representation of the endpoint's capabilities
  public getCapabilityList() {
    let capabilities = this.getCapabilities();
    return capabilities.map((capability) => capability.alexaInterface);
  }

  // Get string representation of the endpoint's primitives
  public getPrimitivesList() {
    let primitives = this.getPrimitives();
    return primitives.map((capability) => capability.alexaInterface);
  }

  private isPrimitive(capability) {
    return capability instanceof PrimitiveInterface;
  }

  public toAlexaDiscoveryResponseJson() {
    let selectedDisplayCategories = [];
    this.displayCategories.forEach((displayCategory) => {
      selectedDisplayCategories.push(displayCategory);
    });

    let selectedCapabilities = [];
    this.capabilities.forEach((capability) => {
      selectedCapabilities.push(capability.toJson());
    });

    return {
      endpointId: this.endpointId,
      friendlyName: this.friendlyName,
      description: this.description,
      manufacturerName: this.manufacturerName,
      displayCategories: selectedDisplayCategories,
      cookie: this.cookie,
      capabilities: selectedCapabilities,
    };
  }
}
