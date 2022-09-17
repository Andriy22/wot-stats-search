<template>
  <div class="d-flex justify-center  fill-height" style="position: relative;">
    <v-progress-circular
      :size="128"
      :width="7"
      color="primary"
      indeterminate
      class="vertical-loader"
    ></v-progress-circular>
    <p class="vertical-text">OOps 🤭</p>
    <p class="vertical-redirect-text">{{$t('errors.implements')}}</p>
  </div>
</template>

<script>
export default {
  name: "PublicChat.vue"
};
</script>

<style scoped>
.vertical-loader {
  margin: 0;
  position: absolute;
  top: 40%;
  -ms-transform: translateY(-40%);
  transform: translateY(-40%);
}
.vertical-text {
  margin: 0;
  position: absolute;
  top: 55%;
  -ms-transform: translateY(-55%);
  transform: translateY(-55%);
  font-size: 28px;
}

.vertical-redirect-text {
  margin: 0;
  position: absolute;
  top: 59%;
  -ms-transform: translateY(-59%);
  transform: translateY(-59%);
  font-size: 20px;
}
</style>
