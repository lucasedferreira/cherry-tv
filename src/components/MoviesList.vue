<template>
  <div id="videosList" v-if="videos && videos.length > 0">
    <div id="slide">
      <h1>{{ tag.name }}</h1>
      <div v-show="showLoading" id="loadingVideo">
        <!-- <Spinner /> -->
        carregando
      </div>
      <Carousel
        style="margin-top: -10px; margin-bottom: 30px"
        :items-to-show="howManyPostersToShow()"
        :items-to-scroll="howManyPostersToShow()"
        :snap-align="'start'"
      >
        <Slide :key="video.id" v-for="video in videos">
          <div :ref="video.id || video.url"></div>
          <VideoCard
            :video="video"
            @click="openModal(video)"
          />
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
    <MovieModal
      :video="selectedVideo"
      :startTop="modalStartPosition.top"
      :startLeft="modalStartPosition.left"
    />
  </div>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import VideoCard from "@/components/VideoCard";
import MovieModal from "@/components/MovieModal";

import { getVideosByTag } from "@/services/Video";

export default {
  name: "MovieList",
  data() {
    return {
      videos: [],
      showLoading: true,
      paginationButtons: false,
      selectedVideo: null,
      modalStartPosition: {},
    };
  },
  props: {
    tag: Object,
  },
  components: {
    Carousel,
    Slide,
    Navigation,
    VideoCard,
    MovieModal,
  },
  mounted() {
    this.getVideos();
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
    async getVideos() {
      this.showLoading = true;
      try {
        const videos = await getVideosByTag(this.tag.id);
        console.log('videos', videos)
        this.videos = videos;
      } catch (error) {
        console.error(error);
      } finally {
        this.showLoading = false;
      }
    },
    openModal(video) {
      const [div] = this.$refs[video.id || video.url];
      const { top, left } = div.getBoundingClientRect();
      this.modalStartPosition = {
        top: top + "px",
        left: left + "px",
      };

      this.selectedVideo = video;
    },
    closeModal() {
      this.selectedVideo = null;
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

#videosList {
  width: 100%;
  height: 100%;
  text-align: center;
  margin: auto;
}

#videosList h1 {
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

#loadingVideo {
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
