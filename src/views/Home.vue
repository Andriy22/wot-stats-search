<template>
  <div>
    <h1>Hello World</h1>
    <PlayerFilter />
    <br />
    <PlayersTable />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PlayersTable from "../components/PlayersTable.vue";
import PlayerFilter from "../components/PlayerFilter.vue";
export default Vue.extend({
  name: "Home",

  components: {
    PlayersTable,
    PlayerFilter,
  },
});
</script>
