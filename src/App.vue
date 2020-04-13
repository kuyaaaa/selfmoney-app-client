<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  name: "App",
  methods: {
    isEmpty(val) {
      return (
        val === undefined ||
        val === null ||
        (typeof val === "object" && Object.keys(val).length === 0) ||
        (typeof val === "string" && val.trim().length === 0)
      );
    }
  },
  created() {
    if (localStorage.smToken) {
      // 解析token
      const decoded = jwt_decode(localStorage.smToken);
      // console.log(decoded)
      // token存储到vuex中
      this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
      this.$store.dispatch("setUser", decoded);
    }
  }
};
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
#app {
  overflow: hidden;
}
</style>
