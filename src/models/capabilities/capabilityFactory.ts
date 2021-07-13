import { SceneController } from "./smart-home/sceneController.model";
import { LockController } from "./smart-home-security/lockController.model";
import { ColorController } from "./smart-home/colorController.model";
import { BrightnessController } from "./smart-home/brightnessController.model";
import { PlaybackController } from "./video/playbackController.model";
import { Speaker } from "./video/speaker.model";
import { ColorTemperatureController } from "./smart-home/colorTemperatureController.model";
import { PowerController } from "./smart-home/powerController.model";
import type { CapabilityInterface } from "./capabilityInterface.model";
import { EndpointHealth } from "./smart-home/endpointHealth.model";
import { ThermostatController } from "./smart-home/thermostatController.model";
import { ChannelController } from "./video/channelController.model";
import { InputController } from "./video/inputController.model";
import { RangeController } from "./smart-home-generics/rangeController.model";
import { ModeController } from "./smart-home-generics/modeController.model";
import { ToggleController } from "./smart-home-generics/toggleController.model";
import { Alexa } from "./smart-home/alexaController";
import { PercentageController } from "./smart-home/percentageController.model";
import { ContactSensor } from "./smart-home-security/contactSensor.model";
import { TemperatureSensor } from "./smart-home/temperatureSensor.model";

export class CapabilityFactory {
  static smartHomeController = [
    "Alexa.PowerController",
    "Alexa.EndpointHealth",
    "Alexa.ThermostatController",
    "Alexa.ColorTemperatureController",
    "Alexa.BrightnessController",
    "Alexa.ColorController",
    "Alexa.SceneController",
    "Alexa.PercentageController",
    "Alexa.TemperatureSensor",
  ];

  static smartHomeSecurityController = [
    "Alexa.ContactSensor",
    //"Alexa.SecurityPanelController",
    //"Alexa.CameraStreamController",
    "Alexa.LockController",
  ];

  static videoController = [
    "Alexa.PlaybackController",
    "Alexa.ChannelController",
    "Alexa.InputController",
    "Alexa.Speaker",
  ];

  static genericController = [
    "Alexa.ToggleController",
    "Alexa.RangeController",
    "Alexa.ModeController",
  ];

  static getCapability(
    capabilityInterface: string,
    init?: object
  ): CapabilityInterface {
    switch (capabilityInterface) {
      case "Alexa.PowerController":
        return new PowerController(init);
      case "Alexa.EndpointHealth":
        return new EndpointHealth(init);
      case "Alexa.ThermostatController":
        return new ThermostatController(init);
      case "Alexa.ColorTemperatureController":
        return new ColorTemperatureController(init);
      case "Alexa.ChannelController":
        return new ChannelController(init);
      case "Alexa.InputController":
        return new InputController(init);
      case "Alexa.Speaker":
        return new Speaker(init);
      case "Alexa.PlaybackController":
        return new PlaybackController(init);
      case "Alexa.LockController":
        return new LockController(init);
      case "Alexa.BrightnessController":
        return new BrightnessController(init);
      case "Alexa.ColorController":
        return new ColorController(init);
      case "Alexa.SceneController":
        return new SceneController(init);
      case "Alexa.ToggleController":
        return new ToggleController(init);
      case "Alexa.RangeController":
        return new RangeController(init);
      case "Alexa.ModeController":
        return new ModeController(init);
      case "Alexa.PercentageController":
        return new PercentageController(init);
      case "Alexa.ContactSensor":
        return new ContactSensor(init);
      case "Alexa.TemperatureSensor":
        return new TemperatureSensor(init);
      case "Alexa":
        return new Alexa();
      default:
        throw "Unknown Capability";
    }
  }
}
