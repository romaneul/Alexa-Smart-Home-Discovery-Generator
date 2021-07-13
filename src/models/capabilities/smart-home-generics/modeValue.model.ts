import { FriendlyName } from "./friendlyName.model";

export class ModeValue {
  value: string;
  friendlyNames: Array<FriendlyName> = [];

  static fromJson(json) {
    const modeValue = new ModeValue();
    modeValue.value = json.value;
    json.modeResources.friendlyNames.forEach((friendlyNameJson) => {
      modeValue.friendlyNames = [
        ...modeValue.friendlyNames,
        FriendlyName.fromJson(friendlyNameJson),
      ];
    });

    return modeValue;
  }

  toJson() {
    const friendlyNames = this.friendlyNames.map((friendlyName) =>
      friendlyName.toJson()
    );
    return {
      value: this.value,
      modeResources: {
        friendlyNames: friendlyNames,
      },
    };
  }
}
