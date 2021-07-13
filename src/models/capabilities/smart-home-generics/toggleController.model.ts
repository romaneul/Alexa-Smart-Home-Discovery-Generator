import { PrimitiveInterface } from "./genericsInterface.model";
import { Property } from "../property.model";

export class ToggleController extends PrimitiveInterface {
  toggleState = new Property("toggleState", true);
  properties = [this.toggleState];

  constructor(init?) {
    super("Alexa.ToggleController", init);
  }

  toJson() {
    let json = super.toJson();
    return json;
  }
}
