export class PlayerStatsModel {
  accountId: number;
  nickname: string;
  leaveClanId: number;
  leaveClanTag: string;
  wn8: number;
  wn8_1000: number;
  winrate: number;
  strongholdDefenseBattles: number;
  strongholdDefenseAvgDmg: number;
  strongholdAttackBattles: number;
  strongholdAttackAvgDmg: number;
  playerTanks: TanksStatsModel[];

  constructor() {
    this.accountId = 1;
    this.nickname = "1";
    this.leaveClanId = 1;
    this.wn8 = 1;
    this.wn8_1000 = 1;
    this.strongholdAttackAvgDmg = 1;
    this.strongholdAttackBattles = 1;
    this.strongholdDefenseAvgDmg = 1;
    this.strongholdDefenseBattles = 1;
    this.winrate = 1;
    this.playerTanks = [];
    this.leaveClanTag = "[]";
  }
}
export class TanksStatsModel {
  tankId: number;
  name: string;
  strongholdDefenseBattles: number;
  strongholdDefenseAvgDmg: number;
  strongholdAttackBattles: number;
  strongholdAttackAvgDmg: number;
  strongholdBattles: number;
  strongholdAvgDmg: number;

  constructor() {
    this.tankId = 1;
    this.name = "1";
    this.strongholdAttackAvgDmg = 1;
    this.strongholdAttackBattles = 1;
    this.strongholdDefenseAvgDmg = 1;
    this.strongholdDefenseBattles = 1;
    this.strongholdBattles = 1;
    this.strongholdAvgDmg = 1;
  }
}
