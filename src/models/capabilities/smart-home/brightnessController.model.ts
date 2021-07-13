import { Property } from "../property.model";
import { CapabilityInterface } from "../capabilityInterface.model";

export class BrightnessController extends CapabilityInterface {
  properties = [new Property("brightness", true)];

  constructor(init?) {
    super("Alexa.BrightnessController");
  }
}
