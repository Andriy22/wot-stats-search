export class FilterModel {
  winfrom: number;
  winto: number;
  wn8to: number;
  wn8from: number;
  wn8_1000to: number;
  wn8_1000from: number;
  avgfrom: number;
  avgto: number;
  tanks: string;
  isAll: boolean;
  takeCount: number;
  skipInClan: boolean;
  skipInvited: boolean;

  constructor() {
    this.winfrom = -1;
    this.winto = 100;
    this.wn8from = -1;
    this.wn8to = 10000;
    this.wn8_1000from = -1;
    this.wn8_1000to = 10000;
    this.avgfrom = -1;
    this.avgto = 10000;
    this.tanks = "15617,57937,19009";
    this.isAll = false;
    this.takeCount = 50;
    this.skipInClan = false;
    this.skipInvited = false;
  }
}
