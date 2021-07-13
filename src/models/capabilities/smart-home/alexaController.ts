import { CapabilityInterface } from "../capabilityInterface.model";

export class Alexa extends CapabilityInterface {
  canReportState = false;

  constructor() {
    super("Alexa");
  }

  toJson() {
    return {
      type: "AlexaInterface",
      interface: "Alexa",
      version: "3",
    };
  }
}
