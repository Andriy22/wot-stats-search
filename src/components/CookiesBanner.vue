<template>
  <v-bottom-sheet
    v-model="showBanner"
    persistent
    no-click-animation
  >
    <v-sheet
      class="text-center pa-4"
      elevation="12"
    >
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8">
            <p class="text-body-1 mb-0">
              {{ $t('cookies.message') }}
            </p>
          </v-col>
          <v-col cols="12" md="4" class="d-flex justify-center justify-md-end">
            <v-btn
              color="primary"
              class="mr-2"
              @click="acceptCookies"
            >
              {{ $t('cookies.acceptAll') }}
            </v-btn>
            <v-btn
              color="grey"
              outlined
              @click="rejectCookies"
            >
              {{ $t('cookies.rejectAll') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: "CookiesBanner",

  data() {
    return {
      showBanner: false,
    };
  },

  methods: {
    /**
     * Check if user has already made a cookie preference choice
     * @returns {boolean} - true if preference exists in localStorage
     */
    checkCookiePreference() {
      const preference = localStorage.getItem('cookieBannerPreference');
      return preference !== null;
    },

    /**
     * Save user's cookie preference to localStorage
     * @param {boolean} accepted - whether user accepted cookies
     */
    saveCookiePreference(accepted) {
      const preference = {
        accepted: accepted,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('cookieBannerPreference', JSON.stringify(preference));
    },

    /**
     * Handle Accept All button click
     * Saves acceptance preference and hides banner
     */
    acceptCookies() {
      this.saveCookiePreference(true);
      this.showBanner = false;
    },

    /**
     * Handle Reject All button click
     * Saves rejection preference and hides banner
     */
    rejectCookies() {
      this.saveCookiePreference(false);
      this.showBanner = false;
    }
  },

  mounted() {
    // Check if user has already made a preference choice
    // If not, show the banner
    if (!this.checkCookiePreference()) {
      this.showBanner = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-sheet {
  border-top: 3px solid var(--v-primary-base);
}

.text-body-1 {
  line-height: 1.5;
}

@media (max-width: 960px) {
  .v-btn {
    width: 100%;
    margin-bottom: 8px;
  }

  .v-btn.mr-2 {
    margin-right: 0 !important;
  }
}
</style>
