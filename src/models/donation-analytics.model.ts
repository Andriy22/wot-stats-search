export class DonationDataPoint {
  date: string;
  amount: number;
  currency: string;

  constructor() {
    this.date = "";
    this.amount = 0;
    this.currency = "USD";
  }
}

export class DonationAnalyticsModel {
  data: DonationDataPoint[];

  constructor() {
    this.data = [];
  }
}
