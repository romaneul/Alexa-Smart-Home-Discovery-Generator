import type { Property } from "./property.model";

export class CapabilityInterface {
  //properties: { name: string; isEnabled: boolean }[] = [];
  properties: Array<Property> = [];

  canReportState = true;
  proactivelyReported = true;
  retrievable = true;

  type = "AlexaInterface";
  alexaInterface: string;
  version = "3";

  constructor(alexaInterface: string, init?) {
    this.alexaInterface = alexaInterface;
  }

  fromJson(json) {
    if (json.properties) {
      this.proactivelyReported = json.properties.proactivelyReported;
      this.retrievable = json.properties.retrievable;

      this.disableAllProperties();
      json.properties.supported.forEach((supportedProp) => {
        this.enableProperty(supportedProp.name);
      });
    }
  }

  // Disable all Properties
  disableAllProperties() {
    this.properties.forEach((property) => {
      property.isEnabled = false;
    });
  }

  // Enable property by name
  enableProperty(propertyName) {
    this.properties.forEach((property) => {
      if (property.propertyName === propertyName) {
        property.isEnabled = true;
      }
    });
  }

  toJson(): object {
    const supported = this.properties
      .filter((prop) => prop.isEnabled)
      .map((prop) => prop.toJson());

    return {
      type: this.type,
      interface: this.alexaInterface,
      version: this.version,
      properties: {
        supported: supported,
        proactivelyReported: this.proactivelyReported,
        retrievable: this.retrievable,
      },
    };
  }
}
