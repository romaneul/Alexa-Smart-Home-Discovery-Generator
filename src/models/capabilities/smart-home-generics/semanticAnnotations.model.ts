export enum ParentPrimitivesTypes {
  Range = "Alexa.RangeController",
  Mode = "Alexa.ModeController",
}

export const SemanticActions = [
  "Alexa.Actions.Lower",
  "Alexa.Actions.Raise",
  "Alexa.Actions.Close",
  "Alexa.Actions.Open",
];

export const RangeDirectives = ["SetRangeValue", "AdjustRangeValue"];

export const ModeDirectives = ["SetMode"];

export const SemanticStates = ["Alexa.States.Closed", "Alexa.States.Open"];
