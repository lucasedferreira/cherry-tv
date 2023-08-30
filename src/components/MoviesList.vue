<template>
  <div id="moviesList" v-if="movies">
    <div id="slide">
      <h1>{{ category.description }}</h1>
      <div v-show="showLoading" id="loadingMovie">
        <!-- <Spinner /> -->
        carregando
      </div>
      <Carousel
        style="margin-top: -10px; margin-bottom: 30px"
        :items-to-show="howManyPostersToShow()"
        :items-to-scroll="howManyPostersToShow()"
        :snap-align="'start'"
      >
        <Slide :key="movie.id" v-for="movie in movies">
          <div :ref="movie.id || movie.url"></div>
          <MovieCard
            :category="category"
            :movie="movie"
            @click="openModal(movie)"
          />
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
    <MovieModal
      :movie="selectedMovie"
      :startTop="modalStartPosition.top"
      :startLeft="modalStartPosition.left"
    />
  </div>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import MovieCard from "@/components/MovieCard";
import MovieModal from "@/components/MovieModal";

import { Movies } from "@/services/Movie";
export default {
  name: "MovieList",
  data() {
    return {
      movies: [],
      showLoading: true,
      paginationButtons: false,
      selectedMovie: null,
      modalStartPosition: {},
    };
  },
  props: {
    category: Object,
  },
  components: {
    Carousel,
    Slide,
    Navigation,
    MovieCard,
    MovieModal,
  },
  mounted() {
    this.getMovies();
  },
  methods: {
    howManyPostersToShow() {
      if (window.innerWidth <= 1000) return 2;
      if (window.innerWidth <= 1366) return 3;
      if (window.innerWidth <= 1536) return 4;
      if (window.innerWidth <= 1920) return 5;
      if (window.innerWidth <= 2560) return 6;
      return 4;
    },
    getMovies() {
      this.showLoading = true;
      try {
        const movies = Movies(this.category);
        this.movies = movies;
      } catch (error) {
        console.error(error);
      } finally {
        this.showLoading = false;
      }
    },
    openModal(movie) {
      const [div] = this.$refs[movie.id || movie.url];
      const { top, left } = div.getBoundingClientRect();
      this.modalStartPosition = {
        top: top + "px",
        left: left + "px",
      };
      this.selectedMovie = movie;
    },
    closeModal() {
      this.selectedMovie = null;
      document.body.style.overflow = "visible";
    },
  },
};
</script>

<style lang="scss" scoped>
#slide {
  width: 90%;
  height: 100%;
  text-align: center;
  margin: auto;
}

#moviesList {
  width: 100%;
  height: 100%;
  text-align: center;
  margin: auto;
}

#moviesList h1 {
  color: #e5e5e5;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 15px;
  padding-left: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 5px;
  margin-bottom: 20px;
}

#loadingMovie {
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 5px;
  justify-content: left;
  align-items: start;
}

.carousel__prev {
  filter: invert(78%) sepia(1%) saturate(0%) hue-rotate(208deg) brightness(106%)
    contrast(91%);
}
.carousel__next {
  filter: invert(78%) sepia(1%) saturate(0%) hue-rotate(208deg) brightness(106%)
    contrast(91%);
}
</style>
