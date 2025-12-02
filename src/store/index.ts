import Vue from "vue";
import Vuex from "vuex";
import axios, { AxiosError } from "axios";
import { FilterModel } from "@/models/filters.model";
import { API } from "@/config";
import { PlayerStatsModel } from "@/models/player.model";
import { ModSettingsModel } from "@/models/mod-settings.model";
import { PlayerQueueModel } from "@/models/player-queue.model";
import { auth } from "@/store/auth.module";
import api from "@/services/api";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: [],
    selectedPlayers: [],
    isFilterUpdated: false,
    loading: false,
    filter: new FilterModel(),

    isLoading: false,
    modSettings: {},

    playerQueue: [],
    playerHistory: [],

    requestConfig: {
      headers: {

      }
    },

    error: '',
    showError: false,


    // admin

    useExperimentalFilters: true,

    // localization

    selectedLanguage: "EN",
    
    // theme
    isDarkMode: false,
  },
  getters: {
    allPlayers: (state) => state.players,
    getFilter: (state) => state.filter,
    getSelectedPlayers: (state) => state.selectedPlayers,
    getFilterUpdateState: (state) => state.isFilterUpdated,
    getQueue: (state) => state.playerQueue,
    getHistory: (state) => state.playerHistory,
  },
  mutations: {
    SET_PLAYERS(state, data: PlayerStatsModel[]) {
      state.players = data;
    },
    CHANGE_FILTER(state, filter: FilterModel) {
      state.filter = filter;I understand. I need to provide complete file listings for all changes. Let me provide the complete updated files:

src/i18/messages.ts
