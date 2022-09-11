<template>
  <div class="container">
    <h1 class="text-center">{{$t('settings.title')}} {{this.$store.state.authorizedUser.userName}}! </h1>
    <hr>
    <br>
    <div class="container col-8 offset-2">
        <form @submit.prevent="submit">
            <v-textarea
              v-model="$store.state.modSettings.text"
              v-bind:label="$t('settings.message')"
              required
              outlined
              no-resize
              counter
              filled
            ></v-textarea>
            <v-checkbox
              v-model="$store.state.modSettings.isInvite"
              v-bind:label="$t('settings.invite')"
              type="checkbox"

            ></v-checkbox>

          <v-btn
            class="mr-4"
            type="submit"
          >
            {{$t('settings.save')}}
          </v-btn>
        </form>
    </div>
  </div>



</template>

<script>
export default {
  name: "Settings",
  data: () => ({}),
  mounted() {
    this.$store.dispatch("getModSettings");
  },
  methods: {
    submit() {
      this.$store.dispatch("updateModSettings");
    }
  }
}
</script>

<style scoped>

</style>
