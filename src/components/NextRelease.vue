<template>
  <div class="nextReleasesContainer">
    <div class="videoContainer">
      <video autoplay muted loop :src="getRandomVideo()"></video>
    </div>

    <div class="containerReleases">
      <h1>Teste</h1>
      <p>
        Assiste aí oque tu quiser texto texto texto texto texto texto texto
        texto texto texto texto texto textotexto texto texto texto texto texto
        texto texto texto texto texto texto texto texto texto textotexto texto
      </p>
      <button id="buttonPlay">
        play
        <span>Assistir</span>
      </button>
      <button id="buttonInfo">
        info
        <span>Mais informações</span>
      </button>
    </div>
  </div>
</template>

<script>
const videos = require.context("@/assets/next-releases", false, /.mp4$/);

export default {
  name: "NextRealese",
  data() {
    return {};
  },
  methods: {
    getRandomVideo() {
      const videosNames = videos.keys();
      const randomVideo =
        videosNames[Math.floor(Math.random() * videosNames.length)].slice(2);
      return require(`../assets/next-releases/${randomVideo}`);
    }
  }
};
</script>
<style>
.nextReleasesContainer {
  width: 100%;
  height: 700px;
  position: relative;
  /* background: #1414147e; */
  background: linear-gradient(to bottom, #14141450 60%, #141414 100%);;
  display: flex;
  align-items: center;
}
.nextReleasesContainer > .videoContainer {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 99%;
  overflow: hidden;
}
.nextReleasesContainer > .videoContainer > video {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  /* -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%); */
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.containerReleases {
  width: 500px;
  margin-left: 40px;
}
.containerReleases h1 {
  color: #ffffff;
  text-shadow: black 0.1em 0.1em 0.2em;
  font-size: 50px;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 30px;
  position: relative;
}
.containerReleases p {
  color: #e9e9e9;
  font-family: Arial, Helvetica, sans-serif;
  text-shadow: #e9e9e9 0em 0em 0em;
  font-size: 15px;
  margin-bottom: 30px;
  text-align: justify;
}
.containerReleases button {
  border: none;
  background: rgba(78, 78, 78, 0.562);
  color: #e9e9e9;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  transition: transform 0.5s;
}
.containerReleases button:hover {
  border: none;
  background: rgb(255, 255, 255);
  color: #141414;
  transform: scale(1.1);
  cursor: pointer;
}
.containerReleases button span {
  padding-left: 10px;
}
#buttonPlay {
  width: 150px;
  height: 30px;
  margin-right: 20px;
}
#buttonInfo {
  width: 190px;
  height: 30px;
}
@media only screen and (max-width: 900px) {
  .nextReleasesContainer {
    height: 50vh;
  }
}
@media only screen and (max-width: 790px) {
  .containerReleases h1 {
    font-size: 40px;
  }
}
@media only screen and (max-width: 699px) {
  .nextReleasesContainer {
    height: 40vh;
  }
  .containerReleases p {
    font-size: 13px;
  }
}
@media only screen and (max-width: 599px) {
  .containerReleases {
    width: 400px;
  }
  .containerReleases p {
    font-size: 13px;
  }
  #buttonPlay {
    width: 120px;
  }
  #buttonInfo {
    width: 170px;
  }
}
@media only screen and (max-width: 470px) {
  .containerReleases {
    width: 350px;
    margin-left: 20px;
  }
  .containerReleases h1 {
    font-size: 30px;
  }
  .containerReleases p {
    font-size: 11px;
  }
  #buttonPlay {
    font-size: 12px;
  }
  #buttonInfo {
    font-size: 12px;
  }
  .nextReleasesContainer {
    height: 33vh;
  }
}
@media only screen and (max-width: 399px) {
  .containerReleases {
    width: 270px;
  }
  .containerReleases h1 {
    font-size: 17px;
  }
  .containerReleases p {
    font-size: 8px;
  }
  button span {
    padding-bottom: 300px;
  }
  #buttonPlay {
    font-size: 7px;
    width: 70px;
  }
  #buttonInfo {
    font-size: 7px;
    width: 90px;
  }
}
</style>
