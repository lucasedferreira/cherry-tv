<template>
  <div id="app"></div>
  <MainHeader />
  <router-view />
</template>

<script>
import MainHeader from "./components/MainHeader";
// import { useLoadSeries } from "@/services/Serie";
export default {
  name: "App",
  components: {
    MainHeader,
  },
  async mounted() {
    // const user = await useLoadSeries("i3czlPiLcwGub7TLkMwD");
    // console.log(user);
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
