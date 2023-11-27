<template>
  <div class="video_poster overlay">
    <span class="video_poster__title">{{ video.title }}</span>
    <img :src="video.thumbnail" class="video_poster__image" loading="lazy" />
  </div>
</template>

<script>
export default {
  name: "VideoCard",
  props: {
    video: Object,
  },
};
</script>

<style lang="scss" scoped>
.video_poster {
  border-radius: 5px;
  width: 365px;
  height: 185px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
  .video_poster__image {
    width: inherit;
    transition: all 0.5s ease;
  }
  &:hover {
    transform: scale(1.02);
    cursor: pointer;
    .video_poster__title {
      opacity: 1;
    }
    .overlay {
      opacity: 1;
    }
  }
  .video_poster__title {
    color: white;
    transition: all 0.5s ease;
    opacity: 0;
    font-size: 22px;
    position: absolute;
    z-index: 1;
    left: 25px;
    bottom: 10px;
  }
}
.overlay {
  &::before {
    content: "";
    display: block;
    position: absolute;
    opacity: 0;
    border-bottom: #141414;
    height: 0%;
    width: 100%;
    bottom: 2px;
    background: linear-gradient(to bottom, transparent 0%, #141414 100%);
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    &:before {
      opacity: 1;
      height: 50%;
      bottom: -2px;
    }
  }
}
@media only screen and (max-width: 599px) {
  .video_poster__image {
    height: 150px;
    width: 100px;
  }
  #moviesList {
    h1 {
      font-size: 15px;
      margin-bottom: 5px;
      margin-top: 5px;
    }
  }
}
</style>
