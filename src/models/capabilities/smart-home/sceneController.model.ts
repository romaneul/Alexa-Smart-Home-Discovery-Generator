import { CapabilityInterface } from "../capabilityInterface.model";

export class SceneController extends CapabilityInterface {
  canReportState = false;
  supportsDeactivation: boolean = false;

  constructor(init?) {
    super("Alexa.SceneController");
  }

  // Override toJson as SceneController has a different structure for discovery
  toJson() {
    return {
      type: this.type,
      interface: this.alexaInterface,
      version: this.version,
      supportsDeactivation: this.supportsDeactivation,
    };
  }
}
