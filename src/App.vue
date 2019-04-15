<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  mounted() {
    /**
     * solve production env can not loading background-image
     */
    const { NODE_ENV } = process.env;
    document.documentElement.className = NODE_ENV;
  }
};
</script>
<style lang="less">
@import "~@/assets/global.less";
</style>
