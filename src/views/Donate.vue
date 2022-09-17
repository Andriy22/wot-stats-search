<template>
  <div class="donate">
    <v-card>
      <v-card-text class="pa-4">
        <v-alert
          outlined
          type="error"
          prominent
          border="left"
          style="font-size: 20px"
        >
          {{$t('donate.info')}}

          <br />
        </v-alert>

        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="basil"
          grow
        >
          <v-tab> PayPal </v-tab>

          <v-tab> Donatello </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-row class="justify-center align-center">
              <v-card color="basil" flat>
                <v-card-text>
                  <div id="donate-button-container">
                    <div style="margin: 1rem" id="donate-button"></div>
                  </div>


                </v-card-text>
              </v-card>
            </v-row>
          </v-tab-item>

          <v-tab-item>
            <v-row class="justify-center align-center">
              <v-card color="basil" flat>
                <v-card-text>
                  <a
                    href="https://donatello.to/6oPeLI_/goal/podderzhka-servera-w0-t-stats"
                    target="_blank"
                  >
                    <v-btn color="primary" elevation="2" large x-large>
                      {{$t('donate.btn')}}
                    </v-btn>
                  </a>
                </v-card-text>
              </v-card>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Donate",
  data: () => ({
    tab: null,
  }),
};
</script>

<style scoped>

</style>
