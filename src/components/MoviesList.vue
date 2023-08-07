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
          <div
            class="movie_poster"
            :ref="movie.id || movie.url"
            v-bind:class="[{ overlay: category?.type !== 'SERIE' }]"
            @click="showDetail(movie)"
          >
            <span
              class="movie_poster__title"
              v-if="category?.type !== 'SERIE'"
              >{{ movie.name }}</span
            >
            <img
              :src="movie.poster"
              class="movie_poster__image"
              loading="lazy"
            />
          </div>
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </div>

  <div class="modale" v-if="selectedMovie" @click.self="closeModal()">
    <div class="movie-modal">
      <div class="movie-modal__header">
        <img class="image" :src="selectedMovie.poster" />
        <div class="image-overlay"></div>
        <button type="button" class="close-button" @click="closeModal()">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="button"
            aria-label="close"
            tabindex="0"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.29297 3.70706L10.5859 12L2.29297 20.2928L3.70718 21.7071L12.0001 13.4142L20.293 21.7071L21.7072 20.2928L13.4143 12L21.7072 3.70706L20.293 2.29285L12.0001 10.5857L3.70718 2.29285L2.29297 3.70706Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>

        <div class="content">
          <div class="content__title">{{ selectedMovie.name }}</div>
          <div class="content__buttons">
            <button
              type="button"
              class="play"
              @click="openMovie(selectedMovie)"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z"
                  fill="currentColor"
                ></path>
              </svg>
              Play
            </button>
            <button type="button" class="add">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11 2V11H2V13H11V22H13V13H22V11H13V2H11Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="movie-modal__body">
        <div class="movie-modal__body--first">
          testetestetestetestetestetesteteste testetesteteste
          testetestetestetestetestetestetestetesteteste testeteste teste
          testetestetestetestetestetestetestetesteteste testetesteteste
        </div>
        <div class="movie-modal__body--second">
          <div
            class="groups"
            v-if="selectedMovie.groups && selectedMovie.groups.length > 0"
          >
            <span class="title"
              >Group{{ selectedMovie.groups.length > 1 ? "s" : "" }}:</span
            >
            <span
              class="sub-title"
              :key="i"
              v-for="(group, i) in selectedMovie.groups"
              >{{ group }}</span
            >
          </div>
          <div class="genres">
            <span class="title">Genres:</span>
            <span class="sub-title">{{ selectedMovie.category }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Navigation, Slide } from "vue3-carousel";
// import Spinner from "../components/Spinner";
import { Movies } from "../services/Movie";
export default {
  name: "MovieList",
  data() {
    return {
      movies: [],
      showLoading: true,
      paginationButtons: false,
      selectedMovie: null,
      modalStartTop: 0,
      modalStartLeft: 0,
    };
  },
  props: {
    category: Object,
  },
  components: {
    Carousel,
    Slide,
    Navigation,
    // Spinner
  },
  mounted() {
    this.getMovieDetail();
    window.addEventListener("keyup", (event) => {
      if (this.selectedMovie === null) return;
      if (event.key === "Escape") this.closeModal();
    });
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
    getMovieDetail() {
      this.showLoading = true;
      try {
        // const { data: { Search } } = await Movies(this.category).get();
        const movies = Movies(this.category);
        this.movies = movies;
      } catch (error) {
        console.error(error);
      } finally {
        this.showLoading = false;
      }
    },
    showDetail(movie) {
      const [div] = this.$refs[movie.id || movie.url];
      const { top, left } = div.getBoundingClientRect();
      this.modalStartTop = top + "px";
      this.modalStartLeft = left + "px";
      this.selectedMovie = movie;

      // let marginRightPx = 0;
      // if (window.getComputedStyle) {
      //   let bodyStyle = window.getComputedStyle(document.body);
      //   if (bodyStyle) {
      //     marginRightPx = parseInt(bodyStyle.marginRight, 10);
      //   }
      // }

      // let scrollbarWidthPx = window.innerWidth - document.body.clientWidth;
      // Object.assign(document.body.style, {
      //   overflow: "hidden",
      //   marginRight: `${marginRightPx + scrollbarWidthPx}px`,
      // });
    },
    openMovie(movie) {
      const url = movie.url || movie.episodes[0].url;
      window.open(url);
    },
    closeModal() {
      this.selectedMovie = null;
      // document.body.style.overflow = "visible";
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
}

.movie_poster {
  border-radius: 5px;
  width: 365px;
  height: 185px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
}

.movie_poster .movie_poster__image {
  width: inherit;
  transition: all 0.5s ease;
}

.movie_poster:hover {
  transform: scale(1.02);
  cursor: pointer;
}

.overlay::before {
  content: "";
  display: block;
  position: absolute;
  opacity: 0;
  height: 60%;
  width: 100%;
  bottom: -8%;
  background: linear-gradient(to bottom, transparent 0%, #141414 100%);
}

.overlay:hover:before {
  opacity: 1;
}

.movie_poster .movie_poster__title {
  transition: all 0.5s ease;
  opacity: 0;
  font-size: 22px;
  position: absolute;
  z-index: 1;
  left: 25px;
  bottom: 10px;
}

.movie_poster:hover .movie_poster__title {
  opacity: 1;
}

.movie_poster:hover .overlay {
  opacity: 1;
}

@media only screen and (max-width: 599px) {
  .movie_poster__image {
    height: 150px;
    width: 100px;
  }
  #moviesList h1 {
    font-size: 15px;
    margin-bottom: 5px;
    margin-top: 5px;
  }
}

@keyframes open-modal {
  0% {
    top: v-bind(modalStartTop);
    left: v-bind(modalStartLeft);
    width: 339px;
  }
  60% {
    top: 80px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    width: 50%;
  }
  100% {
    top: 80px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    width: 50%;
  }
}

@keyframes show-header-overlay {
  0% {
    height: 0;
    opacity: 1;
  }
  100% {
    height: 100%;
    opacity: 1;
  }
}

@keyframes show-header-content {
  0% {
    margin-bottom: -20px;
    opacity: 0;
  }
  100% {
    margin-bottom: 0;
    opacity: 1;
  }
}

@keyframes show-body {
  0% {
    margin-top: -300px;
    opacity: 0;
    height: 0;
    padding: 0 83px;
  }
  50% {
    opacity: 0;
  }
  100% {
    margin-bottom: 0;
    opacity: 1;
    height: 100%;
    padding: 15px 83px;
  }
}

.modale:before {
  content: "";
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.movie-modal {
  position: fixed;
  z-index: 9999;
  animation-name: open-modal;
  animation-duration: 0.7s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  transition: all 0.5s ease;

  background-color: #141414;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;

  &__header {
    position: relative;
    z-index: 2;

    .close-button {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      right: 0;
      margin: 1em;
      cursor: pointer;
      background-color: #141414;
      color: #ffffff;
      border-radius: 50%;
      height: 36px;
      padding: 8px;
      width: 36px;
      border: 0;
    }

    .image {
      width: 100%;
    }

    .image-overlay {
      opacity: 0;
      animation-name: show-header-overlay;
      animation-delay: 0.5s;
      animation-duration: 1.3s;
      animation-timing-function: ease-out;
      animation-fill-mode: forwards;

      position: absolute;
      bottom: 0;
      background: linear-gradient(0deg, #141414, transparent 50%);
      width: 100%;
      height: 100%;
      background-size: cover;
      color: white;
      padding: 20px;
    }

    .content {
      opacity: 0;
      animation-name: show-header-content;
      animation-delay: 0.5s;
      animation-duration: 1s;
      animation-timing-function: ease-out;
      animation-fill-mode: forwards;
      display: grid;
      align-items: center;
      justify-content: space-between;
      align-content: center;
      position: absolute;
      width: 100%;
      bottom: 45px;
      padding: 0 83px;

      &__title {
        font-size: 50px;
        font-family: Kanit;
        color: #fff;
        display: flex;
        width: 100%;
        margin-bottom: 15px;
      }

      &__buttons {
        display: flex;
        align-items: center;
        align-items: stretch;
        width: 100%;

        .play {
          appearance: none;
          border: 0;
          border-radius: 4px;
          padding-left: 25px;
          padding-right: 33px;
          background-color: #fff;
          color: #141414;
          font-size: 18px;
          font-weight: 700;
          line-height: 42px;
          cursor: pointer;

          display: flex;
          align-items: center;

          svg {
            margin-right: 10px;
          }
        }

        .add {
          max-width: 42px;
          min-width: 32px;
          background-color: rgba(42, 42, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.7);
          border-width: 2px;
          padding-left: 0.8rem;
          padding-right: 0.8rem;
          color: #fff;
          border-radius: 50%;
          cursor: pointer;
          margin-left: 15px;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;

          svg {
            height: 60%;
          }

          &:hover {
            border-color: #fff;
            background-color: rgba(42, 42, 42, 1);
          }
        }
      }
    }
  }

  &__body {
    z-index: 1;
    height: 0;
    opacity: 0;
    animation-name: show-body;
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
    animation-delay: 0.3s;
    transition: all 0.5s ease;

    display: grid;
    grid-template-columns: 2fr 1fr;
    align-items: baseline;
    column-gap: 10px;
    color: #ffffff;
    word-break: break-word;

    &--first {
      width: 100%;
      font-size: 25px;
      padding-right: 40px;
    }

    &--second {
      width: 100%;
      font-size: 18px;

      .groups,
      .genres {
        margin-bottom: 10px;

        .title {
          color: #777;
        }

        span {
          line-height: 20px;
          margin: 0 2px;
        }

        .sub-title {
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
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
