import { PrimitiveInterface } from "./genericsInterface.model";
import { Property } from "../property.model";
import { ActionMapping } from "./actionMapping.model";
import { ModeValue } from "./modeValue.model";
import { ParentPrimitivesTypes } from "./semanticAnnotations.model";
import { StateMapping } from "./stateMapping.model";

export class ModeController extends PrimitiveInterface {
  properties = [new Property("mode", true)];

  ordered: boolean = false;
  supportedModes: Array<ModeValue> = [];

  constructor(init?) {
    super("Alexa.ModeController", init);
  }

  fromJson(json) {
    super.fromJson(json);

    this.ordered = json.configuration.ordered;

    // Mode Values
    const modes = json.configuration.supportedModes;
    modes.forEach((modeJson) => {
      this.supportedModes = [
        ...this.supportedModes,
        ModeValue.fromJson(modeJson),
      ];
    });

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

    const modeValuesJson = this.supportedModes.map((mode) => {
      return mode.toJson();
    });

    json["configuration"] = {
      ordered: this.ordered,
      supportedModes: modeValuesJson,
    };

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
