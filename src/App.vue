<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <router-link
          style="text-decoration: none; color: inherit"
          v-for="(item,index) in routes"
          :key="item.text + index"
          :to="item.link"

        >
          <v-list-item  v-if="(item .onlyAuth && $store.state.isAuthorized) || !item.onlyAuth" :key="item.text" link>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t(`routes.${item.text}`) }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-divider></v-divider>
          <v-select label="Language"
                    v-model="$i18n.locale"
                    :value = "$store.state.selectedLanguage"
                    :items="languages">

          </v-select>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app clipped-left dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
        style="cursor: pointer"
        @click="authDialog = true"
        class="mr-12 align-center"
      >
        <span class="title">WoT-STATS Search</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn  @click="authDialog = true" v-if="!$store.state.isAuthorized">{{$t('auth.authorize')}}</v-btn>
      <v-btn  @click="authDialog = true" v-if="$store.state.isAuthorized">{{$store.state.authorizedUser.userName}}</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>


    <v-dialog
      v-model="authDialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">{{$t('auth.title')}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Email"
                  required
                  v-model="authData.email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-bind:label="$t('auth.password')"
                  type="password"
                  v-model="authData.password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="authDialog = false"
          >
            {{$t('auth.cancel')}}
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="Authorize"
          >
            {{$t('auth.login')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="$store.state.showError"
      timeout="2000"
    >
      {{ $store.state.error }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"

          @click="$store.dispatch('displayError', {isHidden: true, text: ''})"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </v-app>
</template>

<script>

export default {
  data: () => ({
    drawer: null,
    dialog: false,
    authDialog: false,
    languages: ["EN", "UA", "RU"],
    authData: {email: "", password: ""},
    routes: [{ icon: "mdi-account-search", text: "search", link: "/", onlyAuth: false },
             { icon: "mdi-cogs", text: "settings", link: "/settings", onlyAuth: true},
             { icon: "mdi-cloud-outline", text: "queue", link: "/queue", onlyAuth: true },
             { icon: "mdi-history", text: "history", link: "/history", onlyAuth: true },
             { icon: "mdi-download", text: "download", link: "/download", onlyAuth: false },
             { icon: "mdi-currency-usd", text: "donate", link: "/donate", onlyAuth: false },
             // { icon: "mdi-face-agent", text: "Поддержка", link: "/support", onlyAuth: false  },
             { icon: "mdi-shield-crown", text: "devsettings", link: "/dev/settings", onlyAuth: false },
    ],
  }),

  methods: {
    Authorize() {
      this.$store.dispatch("authorize", this.authData);
      this.authDialog = false;
    }
  },

  mounted() {
    const auth =  JSON.parse(localStorage.getItem("auth"));
    if (auth) {
      this.$store.dispatch("authorizeToken", auth);
    }

    this.$store.dispatch("getCountryCode");

  },
  watch: {
    '$store.state.selectedLanguage' : function() {
      this.$i18n.locale = this.$store.state.selectedLanguage;
    }
  }

};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
