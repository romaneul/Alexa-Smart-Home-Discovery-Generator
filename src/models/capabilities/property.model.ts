export class Property {
  constructor(name: string, isEnabled: boolean) {
    this.propertyName = name;
    this.isEnabled = isEnabled;
  }

  propertyName: string;
  isEnabled: boolean;

  fromJson() {}

  toJson() {
    return {
      name: this.propertyName,
    };
  }
}
