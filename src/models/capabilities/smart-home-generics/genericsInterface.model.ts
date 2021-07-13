import { CapabilityInterface } from "../capabilityInterface.model";
import { FriendlyName, FriendlyNameTypes } from "./friendlyName.model";
import type { ActionMapping } from "./actionMapping.model";
import type { StateMapping } from "./stateMapping.model";

export class PrimitiveInterface extends CapabilityInterface {
  instance = "";
  capabilityResources = {};
  friendlyNames: Array<FriendlyName> = [];
  actionMappings: Array<ActionMapping> = [];
  stateMappings: Array<StateMapping> = [];

  constructor(primitiveName, init?) {
    super(primitiveName);
  }

  public addFriendlyNameFromAssetCatalog(assetId) {
    let friendlyName = new FriendlyName(FriendlyNameTypes.Asset);
    friendlyName.setAssetId(assetId);
    this.friendlyNames.push(friendlyName);
  }

  public addFriendlyNameCustom(text: string, locale) {
    let friendlyName = new FriendlyName(FriendlyNameTypes.Text);
    friendlyName.setCustomFriendlyName(text, locale);
    this.friendlyNames.push(friendlyName);
  }

  fromJson(json) {
    super.fromJson(json);

    this.instance = json.instance;

    json.capabilityResources.friendlyNames.forEach((friendlyNameJson) => {
      this.friendlyNames = [
        ...this.friendlyNames,
        FriendlyName.fromJson(friendlyNameJson),
      ];
    });
  }

  // Override toJson as ToggleController has a different structure for discovery
  toJson() {
    let json = super.toJson();

    let friendlyNames = this.friendlyNames.reduce((allFriendlyNames, fn) => {
      allFriendlyNames.push(fn.toJson());
      return allFriendlyNames;
    }, []);

    json["instance"] = this.instance;
    json["capabilityResources"] = {
      friendlyNames: friendlyNames, // todo
    };
    return json;
  }
}
