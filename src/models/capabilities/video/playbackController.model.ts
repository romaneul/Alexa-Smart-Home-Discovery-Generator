import { CapabilityInterface } from "../capabilityInterface.model";

export class PlaybackController extends CapabilityInterface {
  canReportState = false;

  operations: { name: string; isEnabled: boolean }[] = [
    { name: "Play", isEnabled: true },
    { name: "Pause", isEnabled: true },
    { name: "Stop", isEnabled: true },
    { name: "StartOver", isEnabled: false },
    { name: "Previous", isEnabled: true },
    { name: "Next", isEnabled: true },
    { name: "Rewind", isEnabled: false },
    { name: "FastForward", isEnabled: false },
  ];

  constructor(init?) {
    super("Alexa.PlaybackController");
  }

  // Override toJson as PlaybackController has a different structure for discovery
  toJson() {
    const supportedOperations = this.operations
      .filter((operation) => operation.isEnabled)
      .map((operation) => operation.name);

    return {
      type: this.type,
      interface: this.alexaInterface,
      version: this.version,
      supportedOperations: supportedOperations,
    };
  }
}
