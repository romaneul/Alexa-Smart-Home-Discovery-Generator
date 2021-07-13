import { Property } from "../property.model";
import { CapabilityInterface } from "../capabilityInterface.model";

export class ChannelController extends CapabilityInterface {
  properties = [new Property("channel", true)];

  constructor(init?) {
    super("Alexa.ChannelController");
  }
}
