import { Property } from "../property.model";
import { CapabilityInterface } from "../capabilityInterface.model";

export class EndpointHealth extends CapabilityInterface {
  properties = [new Property("connectivity", true)];

  constructor(init?) {
    super("Alexa.EndpointHealth");
  }
}
