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
