import { Property } from "../property.model";
import { CapabilityInterface } from "../capabilityInterface.model";

export class ColorController extends CapabilityInterface {
  properties = [new Property("color", true)];

  constructor(init?) {
    super("Alexa.ColorController");
  }
}
