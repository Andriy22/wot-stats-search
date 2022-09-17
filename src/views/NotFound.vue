<template>
  <div class="d-flex justify-center  fill-height" style="position: relative;">
    <p class="vertical-text">404</p>
    <p class="vertical-redirect-text">PAGE NOT FOUND</p>
  </div>
</template>

<script>
export default {
  name: "NotFound.vue"
};
</script>

<style scoped>
.vertical-text {
  margin: 0;
  position: absolute;
  top: 30%;
  -ms-transform: translateY(-30%);
  transform: translateY(-30%);
  font-size: 200px;
}

.vertical-redirect-text {
  margin: 0;
  position: absolute;
  top: 54%;
  -ms-transform: translateY(-59%);
  transform: translateY(-59%);
  font-size: 58px;
}
</style>
