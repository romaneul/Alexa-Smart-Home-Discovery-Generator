import { Property } from "../property.model";
import { CapabilityInterface } from "../capabilityInterface.model";

export class ContactSensor extends CapabilityInterface {
  properties = [new Property("detectionState", true)];

  constructor(init?) {
    super("Alexa.ContactSensor");
  }
}
