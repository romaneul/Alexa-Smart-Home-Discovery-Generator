import { Property } from "../property.model";
import { CapabilityInterface } from "../capabilityInterface.model";

export class LockController extends CapabilityInterface {
  properties = [new Property("lockState", true)];

  constructor(init?) {
    super("Alexa.LockController");
  }
}
