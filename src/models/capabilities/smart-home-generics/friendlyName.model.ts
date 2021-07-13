export class FriendlyName {
  type: FriendlyNameTypes;
  assetId;
  text: string;
  locale: string;

  constructor(type: FriendlyNameTypes) {
    this.type = type;
  }

  setAssetId(assetId) {
    this.assetId = assetId;
    return this;
  }

  setCustomFriendlyName(text: string, locale) {
    this.text = text;
    this.locale = locale;
    return this;
  }

  private getValue() {
    if (this.type === FriendlyNameTypes.Asset) {
      return {
        assetId: this.assetId,
      };
    }

    if (this.type === FriendlyNameTypes.Text) {
      return {
        text: this.text,
        locale: this.locale,
      };
    }
  }

  static fromJson(json) {
    let friendlyName: FriendlyName;
    if (json["@type"] === "asset") {
      friendlyName = new FriendlyName(FriendlyNameTypes.Asset);
      friendlyName.assetId = json.value.assetId;
    } else {
      friendlyName = new FriendlyName(FriendlyNameTypes.Text);
      friendlyName.text = json.value.text;
      friendlyName.locale = json.value.locale;
    }

    return friendlyName;
  }

  public toJson() {
    return {
      "@type": this.type,
      value: this.getValue(),
    };
  }
}

export enum FriendlyNameTypes {
  Asset = "asset",
  Text = "text",
}
