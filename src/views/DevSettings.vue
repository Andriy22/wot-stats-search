<template>
  <div>
    <h1 class="text-center">DEVELOPER PANEL</h1>
    <h3 class="text-center">This panel is used to debug the application, enable experimental features and connect to other servers of the service WoT-STATS</h3>
    <v-divider></v-divider>
    <br/>
    <div class="container">
      <v-expansion-panels
        multiple
      >
        <v-expansion-panel v-model="panels">
          <v-expansion-panel-header>Filter settings</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-checkbox
              label="Use the new version of filters?"
              color="red darken-3"
              v-model="$store.state.useExperimentalFilters"
              @change="useExperimentalFilters"
            ></v-checkbox>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>Server</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-select
              :items="servers"
              label="Server"
              @change="serverChanged"
              :value="selectedServer"
              dense
            ></v-select>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>Language service</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-select
              :items="languages"
              label="Default language"
              value="EN"
              disabled
              dense
            ></v-select>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>



    </div>

    <v-dialog
      v-model="dialog"
      persistent
      width="400"
    >
      <v-card
        dark
      >
        <v-card-text>
          <p v-if="!connected">Connecting to <b>{{selectedServer}} </b> Server... </p>

          <v-alert
            dense
            text
            v-if="connected"
            type="error"
            class="mb-0"
          >Failed to connect to <b>{{selectedServer}} server! </b></v-alert>

          <v-progress-linear v-if="!connected"
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
export default {
  name: "DevSettings",
  data() {
    return {
      panels: [0, 1],
      servers: ["WoT-STATS MAIN", "WoT-STATS NEXT", "WoT-STATS Localhost"],
      selectedServer: "WoT-STATS MAIN",
      languages: ['UA', "EN", "RU"],
      dialog: false,
      connected: false,
    }
  },
  methods: {
    serverChanged(event) {
      this.dialog = true;
      this.selectedServer = event;
    },
    useExperimentalFilters(event) {
      if (event) {
        this.$store.dispatch('useExperimentalFilters', true);
      } else {
        this.$store.dispatch('useExperimentalFilters', false);
      }
    }
  },
  watch: {
    dialog (val) {
      if (!val) return
      setTimeout(() => (this.dialog = false, this.connected = false), 8000)
      setTimeout(() => (this.connected = true), 4000)
    },
  },
};
</script>

<style scoped>

</style>
