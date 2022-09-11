<template>



  <div>
    <v-dialog
      v-model="addPlayerModal"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">{{$t('queue.addplayer')}}</span>
        </v-card-title>
        <v-card-text>
          <v-col cols="12">
            <v-text-field
              label="NickName"
              required
              v-model="playerNickName"
            ></v-text-field>
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="addPlayerModal = false"
          >
            {{$t('buttons.cancel')}}
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="AddPlayer"
          >
            {{$t('buttons.add')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-btn color="primary" @click="removePlayersFromQueue" style="margin: 1rem"> {{$t('queue.removeplayers', {count: selected.length})}}</v-btn>
    <v-btn color="orange" @click="addPlayerModal = true" style="margin: 1rem"> {{$t('queue.addplayer')}}</v-btn>
    <v-data-table
      style="margin: 1rem"
      :headers="headers"
      :items="getQueue"
      v-model="selected"
      item-key="nickname"
      show-select
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



      <template v-slot:item.actions="{ item }" v-if="$store.state.isAuthorized">
        <v-icon
          small
          class="mr-2"
          @click="remove(item)"
        >
          mdi-minus
        </v-icon>
      </template>
    </v-data-table>


  </div>

</template>

<script>


export default {
  name: "Queue",

  data() {
    return {
      singleSelect: false,
      snackbar: false,
      selected: [],
      selectLimit: 50,
      addPlayerModal: false,
      playerNickName: "",
      headers: [
        {
          text: "Nickname",
          align: "start",
          sortable: false,
          value: "nickname",
        },
        { text: "AccountId", value: "accountId" },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    };
  },
  methods: {
    remove(item) {
      this.$store.dispatch("removePlayerFromQueue", item.accountId);
    },
    removePlayersFromQueue() {
      this.selected.forEach(el => {
        this.$store.dispatch("removePlayerFromQueue", el.accountId);
      })

      setTimeout(() => {
        this.selected = [];
      }, 0);
    },

    AddPlayer() {
      this.$store.dispatch("addCustomPlayerToQueue", this.playerNickName);
      this.playerNickName = "";
    }
  },
  computed: {
    getQueue() {
      return this.$store.getters.getQueue;
    },
  },
  mounted() {
    this.$store.dispatch("getPlayerQueue");
  },
};
</script>

<style lang="scss" scoped>
</style>
