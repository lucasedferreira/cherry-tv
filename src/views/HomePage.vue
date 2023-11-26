<template>
  <div class="home-content">
    <div class="home-content__header">
      <NextRelease />
    </div>
    <div class="home-content__body">
      <MoviesList
        :key="tag.id"
        :tag="tag"
        v-for="tag in tags"
      />
    </div>
    <h4 class="home-content__footer">CherryTV</h4>
  </div>
</template>

<script>
import NextRelease from "@/components/NextRelease";
import MoviesList from "@/components/MoviesList";
import { getTags } from "@/services/Tag";

export default {
  name: "HomePage",
  components: {
    NextRelease,
    MoviesList,
  },
  data() {
    return {tags: []}
  },
  async mounted() {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    this.tags = await getTags(userId);
  }
};
</script>

<style lang="scss">
.home-content {
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
  .home-content h4 {
    font-size: 14px;
  }
}
</style>
