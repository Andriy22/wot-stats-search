<template>
  <div>
    <v-btn color="primary" @click="addPlayersToQueue" style="margin: 1rem"> {{$t('table.addplayers', {count: selected.length})}}</v-btn>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="getterplayers"
      :single-select="singleSelect"
      item-key="nickname"
      option
      show-select
      :loading="$store.state.isLoading"
      class="elevation-1"
    >
      <template v-slot:item.nickname="{ item }">
          <a style="text-decoration: none; font-weight: bold" target="_blank" v-bind:href="`https://ru.wargaming.net/clans/wot/search/#wgsearch&type=accounts&search=${item.nickname}&account_id=${item.accountId}&limit=10&accounts-battle_type=fort_battles&accounts-timeframe=28`"> 
            {{item.nickname}} 
          </a>
      </template>
      <template v-slot:item.wn8="{ item }">
        <v-chip :color="getwn8color(item.wn8)" dark>
          {{ item.wn8.toFixed(1) }}
        </v-chip>
      </template>
      <template v-slot:item.wn_1000="{ item }">
        <v-chip v-if="!item.wn_1000" :color="getwn8color(item.wn_1000)" dark>
          <span> [DISABLED] </span>
        </v-chip>
        <v-chip v-if="item.wn_1000" :color="getwn8color(item.wn_1000)" dark>
          {{ item.wn_1000.toFixed(1) }}
        </v-chip>
      </template>

      <template v-slot:item.winrate="{ item }">
        <v-chip :color="getwincolor(item.winrate)" dark>
          {{ item.winrate.toFixed(1) }}
        </v-chip>
      </template>

      <template v-slot:item.playerTanks="{ item }">
        <span v-for="tank in item.playerTanks" :key="item.nickname + tank.name">
          {{ tank.name }} ({{ tank.strongholdDefenseAvgDmg }})
        </span>
      </template>

      <template v-slot:item.actions="{ item }" v-if="$store.state.isAuthorized">
        <v-icon
          small
          class="mr-2"
          @click="add(item)"
          color="green"
        >
          mdi-plus
        </v-icon>

        <v-icon
          small
          class="mr-2"
          @click="remove(item)"
          v-if="$store.state.playerQueue.find(x=>x.accountId == item.accountId)"
          color="red"
        >
          mdi-minus
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>

import { PlayerStatsModel } from "@/models/player.model";

export default {
  name: "PlayersTable",

  data() {
    return {
      singleSelect: false,
      snackbar: false,
      selected: [],
      selectLimit: 100,
      headers: [
        {
          text: "Nickname",
          align: "start",
          sortable: false,
          value: "nickname",
        },
          { text: this.$t('table.leave'), value: "leaveClanTag" },
        { text: this.$t('table.winrate'), value: "winrate" },
        { text: this.$t('table.wn8'), value: "wn8" },
        { text: this.$t('table.wn81000'), value: "wn_1000" },
        { text: this.$t('table.avgdmg'), value: "strongholdDefenseAvgDmg" },
        { text: this.$t('table.avgbtls'), value: "strongholdDefenseBattles" },
        { text: this.$t('table.tanks'), value: "playerTanks" },
        { text: this.$t('table.actions'), value: 'actions', sortable: false },
      ],
    };
  },
  methods: {
    savePlayers() {
      let players = "";
      let counter = 0;
      this.selected.forEach((player, index) => {
        if (this.selected.length - 1 === index) {
          players += player.nickname;
        } else {
          players += player.nickname + "\n";
        }
        counter++;
      });

    },
    addPlayersToQueue() {
        this.selected.forEach(el => {
          this.$store.dispatch("addPlayerToQueue", el.accountId);
        });

      setTimeout(() => {
        this.selected = [];
      }, 0);
    },
    add(item) {
      this.$store.dispatch("addPlayerToQueue", item.accountId);
    },
    remove(item) {
      this.$store.dispatch("removePlayerFromQueue", item.accountId);
    },
    getwn8color(wn8) {
      if (wn8 < 531) return "red";
      else if (wn8 > 531 && wn8 < 1042) return "orange";
      else if (wn8 > 1042 && wn8 < 1640) return "#eed206";
      else if (wn8 > 1640 && wn8 < 2500) return "green";
      else if (wn8 > 2500 && wn8 < 3358) return "cyan";
      else if (wn8 > 3358) return "purple";
      else return "pink";
    },
    getwincolor(win) {
      if (win < 46.33) return "red";
      else if (win > 46 && win < 49) return "orange";
      else if (win > 49 && win < 53) return "#eed206";
      else if (win > 53 && win < 58) return "green";
      else if (win > 58 && win < 63) return "cyan";
      else if (win > 63) return "purple";
      else return "pink";
    },
  },
  computed: {
    getterplayers() {
      return this.$store.getters.allPlayers;
    },
    getSelectedPlayets() {
      return this.$store.getters.getSelectedPlayers;
    },
    getFilterUpdateState() {
      return this.$store.getters.getFilterUpdateState;
    },
  },
  watch: {
    selected(val, oldVal) {
      if (val.length > this.selectLimit) {
        this.$nextTick(() => {
          this.selected = oldVal;
          this.snackbar = true;
        });
      }
    },
    getFilterUpdateState(val, oldVal) {
      if (val) {
        this.selected = [];
        this.$store.dispatch("changeFilterState");
      }
    },
  },
  mounted() {
    if (this.$store.state.isAuthorized) {
      this.$store.dispatch("getPlayerQueue");
    }
  },
};
</script>

<style lang="scss" scoped>
div {
  margin: 1rem;
}
</style>
