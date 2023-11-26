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

export default {
  name: "App",
  components: {
    MainHeader,
  },
};
</script>
