import Vue from "vue";
import Vuex from "vuex";
import axios, { AxiosError } from "axios";
import { FilterModel } from "@/models/filters.model";
import { API } from "@/config";
import { PlayerStatsModel } from "@/models/player.model";
import { AuthModel } from "@/models/auth.model";
import { ModSettingsModel } from "@/models/mod-settings.model";
import { PlayerQueueModel } from "@/models/player-queue.model";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: [],
    selectedPlayers: [],
    isFilterUpdated: false,
    loading: false,
    filter: new FilterModel(),
    isAuthorized: false,
    authorizedUser: {},
    isLoading: false,
    authorizedUsername: "",

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

    useExperimentalFilters: false,

    // localization

    selectedLanguage: "EN",
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
      state.filter = filter;
    },
    SET_SELECTED_PLAYERS(state, data: PlayerStatsModel[]) {
      state.selectedPlayers = data;
    }, 
    CHANGE_FILTER_STATE(state){
      state.isFilterUpdated =! state.isFilterUpdated;
    },

    START_LOADING(state){
      state.isLoading = true;
    },

    SET_MOD_SETTINGS(state, data: ModSettingsModel) {
      state.modSettings = data;
    },

    STOP_LOADING(state){
      state.isLoading = false;
    },
    AUTHORIZE(state, data: AuthModel) {
      state.isAuthorized = true;
      state.authorizedUsername = data.userName;
      state.authorizedUser = data;
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

      state.requestConfig.headers = {
        Authorization: 'Bearer ' + data.token,
      }

      localStorage.setItem("auth", JSON.stringify(data));
    },

    LOGOUT(state) {
      state.isAuthorized = false;
      state.authorizedUsername = "";
      state.requestConfig.headers = {};

      localStorage.removeItem("auth");
    },

    UPDATE_PLAYER_QUEUE(state, data: PlayerQueueModel[]) {
      state.playerQueue = data;
    },

    UPDATE_PLAYER_HISTORY(state, data: PlayerQueueModel[]) {
      state.playerHistory = data;
    },

    USE_EXPERIMENTAL_FILTER(state, data: boolean) {
      state.useExperimentalFilters = data;
    },

    SHOW_ERROR(state, data: any) {
      state.showError = !data.isHidden;
      state.error = data.text;
    },

    SET_LANGUAGE(state, data: string) {
        if (data === "UA") {
          state.selectedLanguage = "UA";
          return;
        }
        if (data === "RU") {
          state.selectedLanguage = "RU";
          return;
        }

        state.selectedLanguage = "EN";
    }

  },
  actions: {
    changeFilter(context, filter: FilterModel) {
      context.commit("CHANGE_FILTER", filter);
    },

    clearSelectedPlayers(context) {
      this.commit('SET_SELECTED_PLAYERS', []);
    },

    addSelectedPlayers(context, players : PlayerStatsModel[]) {
      this.commit('SET_SELECTED_PLAYERS', players);
    },
    changeFilterState(context) {
      context.commit('CHANGE_FILTER_STATE');
    },

    authorizeToken(context, data: AuthModel) {
      context.commit("AUTHORIZE", data)
    },

    getPlayerQueue(context){
      const auth: AuthModel =  JSON.parse(localStorage.getItem("auth"));
      if (auth) {
        context.commit("AUTHORIZE", auth);
      }

      axios.get(`${API}/mod/get-user-mod-queue`, this.state.requestConfig)
        .then((response) => response.data)
        .then((data) => {
          context.commit("UPDATE_PLAYER_QUEUE", data);
        }).catch((err: Error | AxiosError) => {
        if (axios.isAxiosError(err)) {
          context.commit("SHOW_ERROR", { isHidden: false, text: err.response.data['msg'] })
        } else {
          console.log("123");
        }
      })
    },

    getPlayerHistory(context){
      const auth: AuthModel =  JSON.parse(localStorage.getItem("auth"));
      if (auth) {
        context.commit("AUTHORIZE", auth);
      }

      axios.get(`${API}/mod/get-user-mod-history`, this.state.requestConfig)
        .then((response) => response.data)
        .then((data) => {
          context.commit("UPDATE_PLAYER_HISTORY", data);
        }).catch((err: Error | AxiosError) => {
        if (axios.isAxiosError(err)) {
          context.commit("SHOW_ERROR", { isHidden: false, text: err.response.data['msg'] })
        } else {
          console.log("123");
        }
      })
    },

    addPlayerToQueue(context, accountId: number){
      const auth: AuthModel =  JSON.parse(localStorage.getItem("auth"));
      if (auth) {
        context.commit("AUTHORIZE", auth);
      }

      axios.get(`${API}/mod/add-player-to-queue?accountId=${accountId}`, this.state.requestConfig)
        .then((response) => response.data)
        .then((data) => {
          this.dispatch("getPlayerQueue");
        }).catch((err: Error | AxiosError) => {
        if (axios.isAxiosError(err)) {
          context.commit("SHOW_ERROR", { isHidden: false, text: err.response.data['msg'] })
        } else {
          console.log("123");
        }
      })
    },

    addCustomPlayerToQueue(context, nickname: string){
      const auth: AuthModel =  JSON.parse(localStorage.getItem("auth"));
      if (auth) {
        context.commit("AUTHORIZE", auth);
      }

      axios.get(`${API}/mod/add-player-to-custom-queue?nickname=${nickname}`, this.state.requestConfig)
        .then((response) => response.data)
        .then((data) => {
          this.dispatch("getPlayerQueue");
        }).catch((err: Error | AxiosError) => {
        if (axios.isAxiosError(err)) {
          context.commit("SHOW_ERROR", { isHidden: false, text: err.response.data['msg'] })
        } else {
          console.log("123");
        }
      })
    },
    removePlayerFromQueue(context, accountId: number){
      const auth: AuthModel =  JSON.parse(localStorage.getItem("auth"));
      if (auth) {
        context.commit("AUTHORIZE", auth);
      }

      axios.get(`${API}/mod/remove-player-from-queue?accountId=${accountId}&pool=${this.state.playerQueue.find(x=>x.accountId == accountId).pool}`, this.state.requestConfig)
        .then((response) => response.data)
        .then((data) => {
          this.dispatch("getPlayerQueue");
        }).catch((err: Error | AxiosError) => {
        if (axios.isAxiosError(err)) {
          context.commit("SHOW_ERROR", { isHidden: false, text: err.response.data['msg'] })
        } else {
          console.log("123");
        }
      })
    },

    getModSettings(context){
      const auth: AuthModel =  JSON.parse(localStorage.getItem("auth"));
      if (auth) {
        context.commit("AUTHORIZE", auth);
      }

      axios.get(`${API}/mod/get-user-mod-settings`, this.state.requestConfig)
          .then((response) => response.data)
          .then((data) => {
            context.commit("SET_MOD_SETTINGS", data);
          }).catch((err: Error | AxiosError) => {
          if (axios.isAxiosError(err)) {
            context.commit("SHOW_ERROR", { isHidden: false, text: err.response.data['msg'] })
          } else {
            console.log("123");
          }
        })
    },

    updateModSettings(context){
      const auth: AuthModel =  JSON.parse(localStorage.getItem("auth"));
      if (auth) {
        context.commit("AUTHORIZE", auth);
      }

      axios.post(`${API}/mod/update-user-mod-settings`,{
        text: this.state.modSettings['text'],
        isInvite: this.state.modSettings['isInvite'] ? true : false,
        delay: 25
      }, this.state.requestConfig)
        .then((response) => response.data)
        .then((data) => {
          this.dispatch("getModSettings");
        }).catch((err: Error | AxiosError) => {
        if (axios.isAxiosError(err)) {
          context.commit("SHOW_ERROR", { isHidden: false, text: err.response.data['msg'] })
        } else {
          console.log("123");
        }
      })
    },

    authorize(context, data: any) {
        axios.post(`${API}/auth/authorize`, {email: data.email, password: data.password})
          .then((response) => response.data)
          .then((d) => {
            context.commit("AUTHORIZE", d)
            this.dispatch("getPlayerQueue");
          }).catch((err: Error | AxiosError) => {
            if (axios.isAxiosError(err)) {
              context.commit("SHOW_ERROR", {isHidden: false, text: err.response.data['msg']})
            } else {
              console.log("123");
            }
        });
    },
    logOut(context) {
        context.commit("LOGOUT");
    },

    getCountryCode(context) {
        axios.get(`https://ipapi.co/country_code`).then((response) => {
          context.commit("SET_LANGUAGE", response?.data);
        })
    },

    getPlayers(context) {
      const filters = this.state.filter;

      filters.tanks = filters.tanks.replace("NaN,", "");
      filters.tanks = filters.tanks.replace("NaN", "");

      const auth: AuthModel =  JSON.parse(localStorage.getItem("auth"));
      if (auth) {
        context.commit("AUTHORIZE", auth);
      }

      context.commit("START_LOADING");
      axios
        .get(
          `${API}/search/get-players?wn8from=${filters.wn8from}&wn8to=${filters.wn8to}&avgfrom=${filters.avgfrom}&avgto=${filters.avgto}&winfrom=${filters.winfrom}&winto=${filters.winto}&isAll=${filters.isAll}&tanksIds=${filters.tanks}&takeCount=${filters.takeCount}&skipInClan=${filters.skipInClan}&skipInvited=${filters.skipInvited}`,
          this.state.requestConfig
        )
        .then((response) => response.data)
        .then((data) => {
          context.commit("SET_PLAYERS", data);
          context.commit("STOP_LOADING");
        });
    },
    displayError(context, data: any) {
      context.commit("SHOW_ERROR", data);
    },

    //admin

    useExperimentalFilters(context, data: boolean) {
      context.commit("USE_EXPERIMENTAL_FILTER", data);
    }
  },
  modules: {},
});
