<template>
  <div id="app"></div>
  <MainHeader />
  <router-view />
</template>

<script>
import MainHeader from "./components/MainHeader";
export default {
  name: "App",
  components: {
    MainHeader,
  },
};
</script>

<style>
* {
  font-family: Kanit, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}
body {
  background-color: #141414;
  height: 100vh;
}
.scroll-disabled {
  position: fixed;
  width: 100%;
  overflow-y: scroll;
}
</style>
