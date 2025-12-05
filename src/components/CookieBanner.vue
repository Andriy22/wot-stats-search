<template>
  <v-snackbar
    :value="$store.state.showCookieBanner"
    :timeout="-1"
    bottom
    app
    color="grey darken-3"
    multi-line
    elevation="24"
  >
    <div class="d-flex align-center flex-wrap">
      <v-icon left color="white" class="mr-2">mdi-cookie</v-icon>
      <span class="cookie-message">{{ $t('cookie.message') }}</span>
    </div>

    <template v-slot:action="{ attrs }">
      <v-btn
        color="red darken-1"
        text
        v-bind="attrs"
        @click="handleReject"
        class="mr-2"
      >
        {{ $t('cookie.reject') }}
      </v-btn>
      <v-btn
        color="green darken-1"
        text
        v-bind="attrs"
        @click="handleAccept"
      >
        {{ $t('cookie.accept') }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CookieBanner',

  methods: {
    handleAccept() {
      this.$store.dispatch('setCookieConsent', 'accepted');
    },
    handleReject() {
      this.$store.dispatch('setCookieConsent', 'rejected');
    }
  }
});
</script>

<style scoped>
.cookie-message {
  flex: 1;
  min-width: 200px;
}
</style>
