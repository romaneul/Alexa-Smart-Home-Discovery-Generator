import {
  ParentPrimitivesTypes,
  SemanticStates,
} from "./semanticAnnotations.model";

export class StateMapping {
  parentPrimitive: ParentPrimitivesTypes;

  states = [];

  modeValue: string;

  // Range can be single value or range
  rangeValue: number;
  isRange: Boolean = false;
  minimumValue: number;
  maximumValue: number;

  static getStates() {
    return SemanticStates;
  }

  constructor(parentPrimitive) {
    this.parentPrimitive = parentPrimitive;
  }

  static fromJson(parentType: ParentPrimitivesTypes, json) {
    let stateMapping = new StateMapping(parentType);
    stateMapping.states = json.states;

    // For RangeController
    if (parentType === ParentPrimitivesTypes.Range) {
      if (json.range) {
        stateMapping.minimumValue = json.range.minimumValue;
        stateMapping.maximumValue = json.range.maximumValue;
      } else {
        stateMapping.rangeValue = json.value;
      }
    }
    // For Mode Controller
    if (parentType === ParentPrimitivesTypes.Mode) {
      stateMapping.modeValue = json.value;
    }

    return stateMapping;
  }

  private getRangeJson() {
    if (this.isRange) {
      return {
        "@type": "StatesToRange",
        states: this.states,
        range: {
          minimumValue: this.minimumValue,
          maximumValue: this.maximumValue,
        },
      };
    }

    return {
      "@type": "StatesToValue",
      states: this.states,
      value: this.rangeValue,
    };
  }

  private getModeJson() {
    return {
      "@type": "StatesToValue",
      states: this.states,
      value: this.modeValue,
    };
  }

  public toJson() {
    if (this.parentPrimitive === ParentPrimitivesTypes.Mode) {
      return this.getModeJson();
    }
    return this.getRangeJson();
  }
}
