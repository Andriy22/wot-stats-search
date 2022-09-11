<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="getHistory"
      item-key="nickname"
      option
      class="elevation-1"
    >
      <template v-slot:item.nickname="{ item }">
        <a style="text-decoration: none; font-weight: bold" target="_blank" v-bind:href="`https://ru.wargaming.net/clans/wot/search/#wgsearch&type=accounts&search=${item.nickname}&account_id=${item.accountId}&limit=10&accounts-battle_type=fort_battles&accounts-timeframe=28`">
          {{item.nickname}}
        </a>
      </template>

      <template v-slot:item.accountId="{ item }">
        {{ item.accountId }}
      </template>



      <template v-slot:item.date="{ item }">
        {{ item.date }}
      </template>
    </v-data-table>
  </div>
</template>

<script>


export default {
  name: "History",

  data() {
    return {
      headers: [
        {
          text: "Nickname",
          align: "start",
          sortable: false,
          value: "nickname",
        },
        { text: "AccountId", value: "accountId" },
        { text: 'Date (UTC)', value: 'date', sortable: true },
      ],
    };
  },
  computed: {
    getHistory() {
      return this.$store.getters.getHistory;
    },
  },
  mounted() {
    this.$store.dispatch("getPlayerHistory");
  },
};
</script>

<style lang="scss" scoped>
div {
  margin: 1rem;
}
</style>
