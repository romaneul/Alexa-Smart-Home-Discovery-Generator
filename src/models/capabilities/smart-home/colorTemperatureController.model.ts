import { Property } from "../property.model";
import { CapabilityInterface } from "../capabilityInterface.model";

export class ColorTemperatureController extends CapabilityInterface {
  properties = [new Property("colorTemperatureInKelvin", true)];

  constructor(init?) {
    super("Alexa.ColorTemperatureController");
  }
}
