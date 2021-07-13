import {
  ModeDirectives,
  ParentPrimitivesTypes,
  RangeDirectives,
  SemanticActions,
} from "./semanticAnnotations.model";

export class ActionMapping {
  parentPrimitive: ParentPrimitivesTypes;

  actions = [];
  directive;

  modeValue: string;
  rangeValue: number;
  rangeValueDelta: number;

  getActions() {
    return SemanticActions;
  }

  getDirectives() {
    if (this.parentPrimitive === ParentPrimitivesTypes.Range) {
      return RangeDirectives;
    }

    if (this.parentPrimitive === ParentPrimitivesTypes.Mode) {
      return ModeDirectives;
    }
  }

  constructor(type: ParentPrimitivesTypes) {
    this.parentPrimitive = type;
  }

  static fromJson(parentType: ParentPrimitivesTypes, json) {
    let actionMapping: ActionMapping;
    if (parentType === ParentPrimitivesTypes.Range) {
      actionMapping = new ActionMapping(ParentPrimitivesTypes.Range);
      actionMapping.rangeValueDelta = json.directive.payload.rangeValueDelta;
      actionMapping.rangeValue = json.directive.payload.rangeValue;
    } else {
      actionMapping = new ActionMapping(ParentPrimitivesTypes.Mode);
      actionMapping.modeValue = json.directive.payload.mode;
    }

    actionMapping.actions = json.actions;
    actionMapping.directive = json.directive.name;

    return actionMapping;
  }

  public toJson() {
    let payload = {};
    if (this.parentPrimitive === ParentPrimitivesTypes.Range) {
      if (this.directive === "AdjustRangeValue") {
        payload = {
          rangeValueDelta: this.rangeValueDelta,
          rangeValueDeltaDefault: false,
        };
      }
      if (this.directive === "SetRangeValue") {
        payload = {
          rangeValue: this.rangeValue,
        };
      }
    }

    if (this.parentPrimitive === ParentPrimitivesTypes.Mode) {
      payload = {
        mode: this.modeValue,
      };
    }
    return {
      "@type": "ActionsToDirective",
      actions: this.actions,
      directive: {
        name: this.directive,
        payload: payload,
      },
    };
  }
}
