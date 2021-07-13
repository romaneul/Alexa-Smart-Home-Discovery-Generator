import { Property } from "../property.model";
import { CapabilityInterface } from "../capabilityInterface.model";

export class Speaker extends CapabilityInterface {
  properties = [new Property("volume", true), new Property("muted", true)];

  constructor(init?) {
    super("Alexa.Speaker");
  }
}
