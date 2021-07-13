import { Property } from "../property.model";
import { CapabilityInterface } from "../capabilityInterface.model";

export class PercentageController extends CapabilityInterface {
  properties = [new Property("percentage", true)];

  constructor(init?) {
    super("Alexa.PercentageController");
  }
}
