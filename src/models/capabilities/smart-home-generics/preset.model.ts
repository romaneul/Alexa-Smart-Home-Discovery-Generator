import { FriendlyName } from "./friendlyName.model";

export class Preset {
  presetValue: number;
  friendlyNames: Array<FriendlyName> = [];

  static fromJson(json) {
    const preset = new Preset();
    preset.presetValue = json.rangeValue;
    json.presetResources.friendlyNames.forEach((friendlyNameJson) => {
      preset.friendlyNames = [
        ...preset.friendlyNames,
        FriendlyName.fromJson(friendlyNameJson),
      ];
    });

    return preset;
  }

  toJson() {
    const friendlyNames = this.friendlyNames.map((friendlyName) =>
      friendlyName.toJson()
    );
    return {
      rangeValue: this.presetValue,
      presetResources: {
        friendlyNames: friendlyNames,
      },
    };
  }
}
