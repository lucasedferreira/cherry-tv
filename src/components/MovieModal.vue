<template>
  <div class="modale" v-if="movie" @click.self="$parent.closeModal()">
    <div class="movie-modal">
      <div class="movie-modal__header">
        <img class="image" :src="movie.poster" />
        <div class="image-overlay"></div>
        <button
          type="button"
          class="close-button"
          @click="$parent.closeModal()"
        >
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
          <div class="content__title">{{ movie.name }}</div>
          <div class="content__buttons">
            <button type="button" class="play" @click="openMovie(movie)">
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
          <div class="groups" v-if="movie.groups && movie.groups.length > 0">
            <span class="title"
              >Group{{ movie.groups.length > 1 ? "s" : "" }}:</span
            >
            <span
              class="sub-title"
              :key="i"
              v-for="(group, i) in movie.groups"
              >{{ group }}</span
            >
          </div>
          <div class="genres">
            <span class="title">Genres:</span>
            <span class="sub-title">{{ movie.category }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieModal",
  props: {
    movie: Object,
    startTop: String,
    startLeft: String,
  },
  mounted() {
    window.addEventListener("keyup", (event) => {
      if (this.selectedMovie === null) return;
      if (event.key === "Escape") this.$parent.closeModal();
    });
  },
  methods: {
    openMovie(movie) {
      const url = movie.url || movie.episodes[0].url;
      window.open(url);
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes open-modal {
  0% {
    top: v-bind(startTop);
    left: v-bind(startLeft);
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
  text-align: left;

  &__header {
    position: relative;
    z-index: 2;
    line-height: 50px;

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
      padding: 0 50px;

      &__title {
        font-size: 45px;
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
</style>
