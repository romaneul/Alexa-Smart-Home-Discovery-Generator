import { Property } from "../property.model";
import { CapabilityInterface } from "../capabilityInterface.model";

export class TemperatureSensor extends CapabilityInterface {
  properties = [new Property("temperature", true)];

  constructor(init?) {
    super("Alexa.TemperatureSensor");
  }
}
