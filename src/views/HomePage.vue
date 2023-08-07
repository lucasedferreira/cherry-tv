<template>
  <div class="main">
    <div class="main__header">
      <NextRelease />
    </div>
    <div class="main__body">
      <MoviesList
        :key="category.id"
        :category="category"
        v-for="category in categories"
      />
    </div>
    <h4 class="main__footer">CherryTV</h4>
  </div>
</template>

<script>
import NextRelease from "../components/NextRelease";
import MoviesList from "../components/MoviesList";
import { Categories } from "../services/MovieCategory";

export default {
  name: "App",
  components: {
    NextRelease,
    MoviesList,
  },
  computed: {
    categories() {
      return Categories();
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  &__header {
    position: relative;
    z-index: -1;
  }

  &__body {
    margin-top: -150px;
    position: relative;
    z-index: 1;
  }

  &__footer {
    color: #e9e9e9;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    padding-top: 30px;
    padding-bottom: 30px;
  }
}
@media only screen and (max-width: 599px) {
  .main h4 {
    font-size: 14px;
  }
}
</style>
