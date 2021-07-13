import { Property } from "../property.model";
import { CapabilityInterface } from "../capabilityInterface.model";

export class InputController extends CapabilityInterface {
  properties = [new Property("input", true)];

  inputs: { name: string; isEnabled: boolean }[] = [
    { name: "HDMI 1", isEnabled: true },
    { name: "HDMI 2", isEnabled: false },
    { name: "HDMI 3", isEnabled: false },
    { name: "HDMI 4", isEnabled: false },
    { name: "HDMI 5", isEnabled: false },
    { name: "HDMI 6", isEnabled: false },
    { name: "HDMI 7", isEnabled: false },
    { name: "HDMI 8", isEnabled: false },
    { name: "HDMI 9", isEnabled: false },
    { name: "HDMI 10", isEnabled: false },
    { name: "HDMI ARC", isEnabled: false },
    { name: "AUX 1", isEnabled: false },
    { name: "AUX 2", isEnabled: false },
    { name: "AUX 3", isEnabled: false },
    { name: "AUX 4", isEnabled: false },
    { name: "AUX 5", isEnabled: false },
    { name: "AUX 6", isEnabled: false },
    { name: "AUX 7", isEnabled: false },
    { name: "BLURAY", isEnabled: false },
    { name: "CABLE", isEnabled: false },
    { name: "CD", isEnabled: false },
    { name: "COAX 1", isEnabled: false },
    { name: "COAX 2", isEnabled: false },
    { name: "COMPOSITE 1", isEnabled: false },
    { name: "DVD", isEnabled: false },
    { name: "GAME", isEnabled: false },
    { name: "HD RADIO", isEnabled: false },
    { name: "INPUT 1", isEnabled: false },
    { name: "INPUT 2", isEnabled: false },
    { name: "INPUT 3", isEnabled: false },
    { name: "INPUT 4", isEnabled: false },
    { name: "INPUT 5", isEnabled: false },
    { name: "INPUT 6", isEnabled: false },
    { name: "INPUT 7", isEnabled: false },
    { name: "INPUT 8", isEnabled: false },
    { name: "INPUT 9", isEnabled: false },
    { name: "INPUT 10", isEnabled: false },
    { name: "IPOD", isEnabled: false },
    { name: "LINE 1", isEnabled: false },
    { name: "LINE 2", isEnabled: false },
    { name: "LINE 3", isEnabled: false },
    { name: "LINE 4", isEnabled: false },
    { name: "LINE 5", isEnabled: false },
    { name: "LINE 6", isEnabled: false },
    { name: "LINE 7", isEnabled: false },
    { name: "MEDIA PLAYER", isEnabled: false },
    { name: "OPTICAL 1", isEnabled: false },
    { name: "OPTICAL 2", isEnabled: false },
    { name: "PHONO", isEnabled: false },
    { name: "PLAYSTATION", isEnabled: false },
    { name: "PLAYSTATION 3", isEnabled: false },
    { name: "PLAYSTATION 4", isEnabled: false },
    { name: "SATELLITE", isEnabled: false },
    { name: "SMARTCAST", isEnabled: false },
    { name: "TUNER", isEnabled: false },
    { name: "TV", isEnabled: false },
    { name: "USB DAC", isEnabled: false },
    { name: "VIDEO 1", isEnabled: false },
    { name: "VIDEO 2", isEnabled: false },
    { name: "VIDEO 3", isEnabled: false },
    { name: "XBOX", isEnabled: false },
  ];

  constructor(init?) {
    super("Alexa.InputController");
  }

  // Override toJson as InputController has a different structure for discovery
  toJson() {
    const supportedInputs = this.inputs
      .filter((input) => input.isEnabled)
      .map((input) => {
        return { name: input.name };
      });

    const json = super.toJson();
    json["inputs"] = supportedInputs;

    return json;
  }
}
