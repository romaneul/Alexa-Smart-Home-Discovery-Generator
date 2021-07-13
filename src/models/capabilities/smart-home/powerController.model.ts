import { Property } from "../property.model";
import { CapabilityInterface } from "../capabilityInterface.model";

export class PowerController extends CapabilityInterface {
  properties = [new Property("powerState", true)];

  constructor(init?) {
    super("Alexa.PowerController");
  }
}
