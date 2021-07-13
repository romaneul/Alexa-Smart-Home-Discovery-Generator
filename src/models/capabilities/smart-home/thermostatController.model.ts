import { Property } from "../property.model";
import { CapabilityInterface } from "../capabilityInterface.model";

export class ThermostatController extends CapabilityInterface {
  properties = [
    new Property("lowerSetpoint", false),
    new Property("targetSetpoint", true),
    new Property("upperSetpoint", false),
    new Property("thermostatMode", false),
  ];

  indexOfThermostatMode = 3;

  supportedModes: { name: string; isEnabled: boolean }[] = [
    { name: "AUTO", isEnabled: true },
    { name: "COOL", isEnabled: true },
    { name: "HEAT", isEnabled: true },
    { name: "ECO", isEnabled: false },
    { name: "OFF", isEnabled: false },
  ];

  supportsScheduling: boolean = false;

  constructor(init?) {
    super("Alexa.ThermostatController");
  }

  toJson() {
    let json = super.toJson();

    // Add "configuration"
    if (
      this.supportsScheduling ||
      this.properties[this.indexOfThermostatMode].isEnabled
    ) {
      json["configuration"] = {};

      if (this.supportsScheduling) {
        json["configuration"]["supportsScheduling"] = this.supportsScheduling;
      }

      if (this.properties[this.indexOfThermostatMode].isEnabled) {
        const supportedModesArray = this.supportedModes
          .filter((supportedMode) => supportedMode.isEnabled)
          .map((supportedMode) => supportedMode.name);

        json["configuration"]["supportedModes"] = supportedModesArray;
      }
    }

    return json;
  }
}
