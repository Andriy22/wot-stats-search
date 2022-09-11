<template>
<div>

  <v-expansion-panels v-model="panel">

    <v-expansion-panel key="filter" >
      <v-expansion-panel-header> {{$t('filters.title')}} </v-expansion-panel-header>
      <v-expansion-panel-content>
<!--        <v-col cols="12">-->
<!--          <v-alert-->
<!--            border="bottom"-->
<!--            elevation="23"-->
<!--            icon="mdi-vuetify"-->
<!--            type="warning"-->
<!--            v-if="$store.state.players.length === 0"-->
<!--          >-->
<!--            Выберите фильтры и нажмите кнопку <b>обновить игроков</b>!-->
<!--          </v-alert>-->
<!--        </v-col>-->
        <v-form v-model="valid">
          <v-container>
           <v-col cols="12">
              <v-text-field
                v-model="filter.takeCount"
                v-bind:label="$t('filters.count')"
                required
              ></v-text-field>
            </v-col>
            <v-row>
              <v-col cols="12" md="5">
                <v-text-field
                  v-model="filter.winfrom"
                  v-bind:label="$t('filters.winratefrom')"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="5">
                <v-text-field
                  v-model="filter.winto"
                  v-bind:label="$t('filters.winrateto')"
                  required
                ></v-text-field>
              </v-col>

              <v-col md="2" v-if="$store.state.useExperimentalFilters">
                <v-btn outlined rounded disabled>
                  CHANGE

                  <v-icon
                    small
                    class="mr-2"
                    color="orange"
                  >
                     mdi-pencil
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="5">
                <v-text-field
                  v-model="filter.wn8from"
                  v-bind:label="$t('filters.wn8from')"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="5">
                <v-text-field
                  v-model="filter.wn8to"
                  v-bind:label="$t('filters.wn8to')"
                  required
                ></v-text-field>
              </v-col>
              <v-col md="2" v-if="$store.state.useExperimentalFilters">
                <v-btn outlined rounded disabled>
                  CHANGE
                  <v-icon
                    small
                    class="mr-2"
                    color="orange"
                  >
                     mdi-pencil
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="5">
                <v-text-field
                  v-model="filter.wn8_1000from"
                  v-bind:label="$t('filters.wn81000from')"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="5">
                <v-text-field
                  v-model="filter.wn8_1000to"
                  v-bind:label="$t('filters.wn81000to')"
                  required
                ></v-text-field>
              </v-col>
              <v-col md="2" v-if="$store.state.useExperimentalFilters">
                <v-btn outlined rounded disabled>
                  CHANGE
                  <v-icon
                    small
                    class="mr-2"
                    color="orange"
                  >
                     mdi-pencil
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="5">
                <v-text-field
                  v-model="filter.avgfrom"
                  v-bind:label="$t('filters.avgdmgfrom')"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="5">
                <v-text-field
                  v-model="filter.avgto"
                  v-bind:label="$t('filters.avgdmgto')"
                  required
                ></v-text-field>
              </v-col>
              <v-col md="2" v-if="$store.state.useExperimentalFilters">
                <v-btn outlined rounded disabled>
                  CHANGE
                  <v-icon
                    small
                    class="mr-2"
                    color="orange"
                  >
                     mdi-pencil
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-col cols="12">
              <v-autocomplete
                v-model="values"
                :items="items"
                dense
                chips
                small-chips
                v-bind:label="$t('filters.tanks')"
                multiple
                solo
              ></v-autocomplete>
            </v-col>
            <v-radio-group v-model="filter.isAll" row>
              <v-radio
                v-bind:label="$t('filters.haveall')"
                value="true"
              ></v-radio>
              <v-radio
                v-bind:label="$t('filters.haveone')"
                value="false"
              ></v-radio>
            </v-radio-group>

              <v-checkbox
                v-model="filter.skipInClan"
                v-bind:label="$t('filters.skipclan')"
                type="checkbox"
              ></v-checkbox>

              <v-checkbox
                v-model="filter.skipInvited"
                v-bind:label="$t('filters.skipinvited')"
                type="checkbox"
                v-if="$store.state.isAuthorized"
              ></v-checkbox>
            <v-col cols="6">
              <v-btn @click="update" elevation="2" :loading="$store.state.isLoading">{{$t('buttons.updateplayers')}}</v-btn>
            </v-col>



          </v-container>
        </v-form>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

</div>

</template>

<script>
export default {
  name: "PlayerFilter",

  data() {
    return {
      valid: false,
      panel: 0,
      items: [
        { value: 20225, text: "Об. 268/4" },
        { value: 3473, text: "60TP" },
        { value: 6193, text: "WZ-111 5A" },
        { value: 7169, text: "ИС-7" },
        { value: 15617, text: "Об. 907" },
        { value: 8705, text: "Об. 261" },
        { value: 5265, text: "CS-63" },
        { value: 16897, text: "Об. 140" },
        { value: 3649, text: "B-C 25 t" },
        { value: 50849, text: "Carro 45 t" },
        { value: 6209, text: "AMX 50 B" },
        { value: 14113, text: "M48 Patton" },
        { value: 2721, text: "Progetto 65" },
        { value: 9233, text: "G.W. E 100" },
        { value: 4145, text: "121" },
        { value: 8481, text: "T92 HMC" },
        { value: 61697, text: "Т-22 ср." },
        { value: 63537, text: "121B" },
        { value: 13825, text: "Т-62А" },
        { value: 2433, text: "Kranvagn" },
        { value: 14881, text: "T57 Heavy" },
        { value: 4737, text: "Strv 103B" },
        { value: 55841, text: "T95E6" },
        { value: 58369, text: "Об. 260" },
        { value: 6225, text: "FV215b" },
        { value: 13857, text: "T110E3" },
        { value: 21761, text: "К-91" },
        { value: 12369, text: "ConquerorGC" },
        { value: 6929, text: "Maus" },
        { value: 22017, text: "Об. 277" },
        { value: 15905, text: "M60" },
        { value: 3681, text: "STB-1" },
        { value: 57937, text: "T95/FV4201" },
        { value: 15953, text: "Badger" },
        { value: 6145, text: "ИС-4" },
        { value: 10785, text: "T110E5" },
        { value: 9489, text: "E 100" },
        { value: 14609, text: "Leopard 1" },
        { value: 58961, text: "Manticore" },
        { value: 5425, text: "113" },
        { value: 15697, text: "S. Conqueror" },
        { value: 58641, text: "VK 72.01 K" },
        { value: 2417, text: "TVP T 50/51" },
        { value: 19009, text: "EBR 105" },
        { value: 19969, text: "Об. 430У" },
        { value: 46849, text: "Об. 279 (р)" },
        { value: 13089, text: "T110E4" },
        { value: 19201, text: "Т-100 ЛТ" },
      ],
      values: [],
      value: null,
    };
  },

  methods: {
    update(event) {
      // event.preventDefault();
      this.filter.tanks = "";
      this.values.forEach((tankId, index) => {
        if (this.values.length - 1 == index) {
          this.filter.tanks += `${tankId}`;
        } else {
          this.filter.tanks += `${tankId},`;
        }
      });
      this.$store.dispatch("changeFilterState");
      this.$store.dispatch("getPlayers");


      localStorage.setItem("filters", JSON.stringify(this.$store.state.filter));

      console.log(this.panel)
    },
  },

  computed: {
    filter() {
      return this.$store.getters.getFilter;
    },
  },

  mounted() {
    const filters = JSON.parse(localStorage.getItem("filters"));
    if (filters) {
      this.$store.dispatch("changeFilter", filters);
    }
    setTimeout(() => {
      this.values = [];
      this.filter.tanks.split(',').forEach(item => {
        this.values.push( Number.parseInt(item));
      });
    }, 0)

  }
};
</script>

<style lang="scss" scoped>
.main-container {
  margin: 1rem;
}
</style>
