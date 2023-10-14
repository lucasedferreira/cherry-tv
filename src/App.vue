<template>
  <div id="app">
    <MainHeader />
    <div style="padding-top: 70px;">
      <router-view />
    </div>
  </div>
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
