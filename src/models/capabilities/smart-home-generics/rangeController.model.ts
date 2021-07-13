import { PrimitiveInterface } from "./genericsInterface.model";
import { Preset } from "./preset.model";
import { Property } from "../property.model";
import { ActionMapping } from "./actionMapping.model";
import { ParentPrimitivesTypes } from "./semanticAnnotations.model";
import { StateMapping } from "./stateMapping.model";

export class RangeController extends PrimitiveInterface {
  properties = [new Property("rangeValue", true)];

  minimumValue: number = 0;
  maximumValue: number = 10;
  precision: number = 1;
  unitOfMeasure: string = "";

  presets: Array<Preset> = [];

  constructor(init?) {
    super("Alexa.RangeController", init);
  }

  fromJson(json) {
    super.fromJson(json);

    this.minimumValue = json.configuration.supportedRange.minimumValue;
    this.maximumValue = json.configuration.supportedRange.maximumValue;
    this.precision = json.configuration.supportedRange.precision;
    this.unitOfMeasure = json.configuration.unitOfMeasure;

    // Presets
    if (json.configuration.presets) {
      const presets = json.configuration.presets;
      presets.forEach((presetJson) => {
        this.presets = [...this.presets, Preset.fromJson(presetJson)];
      });
    }

    // Semantic Annotations
    if (json.semantics) {
      // Action Mappings
      if (json.semantics.actionMappings) {
        json.semantics.actionMappings.forEach((actionMappingJson) => {
          this.actionMappings = [
            ...this.actionMappings,
            ActionMapping.fromJson(
              ParentPrimitivesTypes.Range,
              actionMappingJson
            ),
          ];
        });
      }

      // State Mappings
      if (json.semantics.stateMappings) {
        json.semantics.stateMappings.forEach((stateMappingJson) => {
          this.stateMappings = [
            ...this.stateMappings,
            StateMapping.fromJson(
              ParentPrimitivesTypes.Range,
              stateMappingJson
            ),
          ];
        });
      }
    }
  }

  toJson() {
    let json = super.toJson();

    // Presets
    const presetsJson = this.presets.map((preset) => {
      return preset.toJson();
    });

    json["configuration"] = {
      supportedRange: {
        minimumValue: this.minimumValue,
        maximumValue: this.maximumValue,
        precision: this.precision,
      },
      presets: presetsJson,
    };

    if (this.unitOfMeasure) {
      json["configuration"]["unitOfMeasure"] = this.unitOfMeasure;
    }

    // Add Semantics
    if (this.actionMappings.length > 0 || this.stateMappings.length > 0) {
      const actionMappingsJson = this.actionMappings.map((actionMapping) => {
        return actionMapping.toJson();
      });
      const stateMappingJson = this.stateMappings.map((stateMapping) => {
        return stateMapping.toJson();
      });
      json["semantics"] = {
        actionMappings: actionMappingsJson,
        stateMappings: stateMappingJson,
      };
    }

    return json;
  }
}
