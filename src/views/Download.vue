<template>
  <v-container>
      <h1 class="text-center">
        {{$t('download.title')}}
      </h1>
      <v-row >
        <v-col cols="2">
        </v-col>
          <v-col cols="4">
            <div >
              <b>{{$t('download.installer')}}</b>
              <br>
              <v-btn href="WoTStatsModInstaller.exe" target="_blank">{{$t('download.download')}}</v-btn>
            </div>

          </v-col>
        <v-col cols="4">
          <b>{{$t('download.manual')}}</b>
          <br>
          <v-btn href="mods.zip" target="_blank">{{$t('download.download')}}</v-btn>
        </v-col>
      </v-row>
    <br/>
    <v-divider> </v-divider>
    <br/>
    <h3 style="text-align: center">
      {{$t('download.help')}} <a target="_blank" href="https://discord.com/invite/YprWezfTpg">{{$t('download.discord')}}</a>
    </h3>
  </v-container>
</template>

<script lang="ts">
export default {
  name: "DownloadMod",

};
</script>

<style scoped>

</style>
