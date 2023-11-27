<template>
  <div class="default-background" :style="{ 'opacity': isScrollOnTop ? 0 : 1 }" @scroll="onScroll"></div>
  <div id="header">
    <img
      class="logoHeader"
      :src="image"
      @click="navigateTo('Home')"
    />
    <nav role="navigation">
      <ul class="options">
        <li class="items" @click="navigateTo('Home')">Início</li>
        <li class="items" @click="navigateTo('VideoRegister')">Cadastrar Vídeo</li>
        <!-- <li class="items">Filmes</li>
        <li class="items">Mais recentes</li>
        <li class="items" @click="navigateMyList">Minha lista</li> -->
        <li></li>
      </ul>
    </nav>
    <div class="icons">
      <!-- teste sonar 2 -->
      <span @click="logout()">Logout</span>
    </div>
  </div>
</template>

<script>
import image from "@/assets/logo-small.png";
// import Icon from "vue-awesome/components/Icon";
export default {
  name: "MainHeader",
  data() {
    return {
      image,
      inputSearch: "",
      isScrollOnTop: true
    };
  },
  mounted() {
    this.checkScroll();
  },
  methods: {
    checkScroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.isScrollOnTop = true;
        }else {
          this.isScrollOnTop = false;
        }
      };
    },
    navigateTo(page) {
      this.$router.push({ name: page });
    },
    logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('tutorial');
      this.$router.push({ name: "Login" });
    }
  },
};
</script>

<style scoped>
#header {
  width: 100%;
  height: 70px;
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 9999;
  background: linear-gradient(to bottom, #141414d5 0%, transparent 100%);
}
.default-background {
  transition: opacity .4s ease-in;
  opacity: 0;
  width: 100%;
  height: 70px;
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 9998;
  background: #141414;
}
.logoHeader {
  height: 70px;
  width: min-content;
  margin-left: 30px;
}
.logoHeader:hover {
  cursor: pointer;
}
nav {
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
}
.options {
  list-style: none;
  margin: 0;
  padding-left: 0;
}
.options li {
  color: #fff;
  display: block;
  float: left;
  padding: 1rem;
  position: relative;
  text-decoration: none;
  transition-duration: 0.5s;
  font-family: Kanit, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 13.5px;
}
.options li a {
  color: #fff;
  cursor: default;
}
.options li:hover {
  cursor: pointer;
}
.items:hover {
  color: #ccc;
}
.icons {
  color: white;
  font-size: 13.5px;
  margin-right: 30px;
  cursor: pointer;
  width: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
@media only screen and (max-width: 906px) {
  nav {
    width: 80vw;
  }
}
@media only screen and (max-width: 626px) {
  #selections {
    padding-top: 30px;
  }
}
@media only screen and (max-width: 541px) {
  #selections {
    padding-top: 50px;
  }
}
@media only screen and (max-width: 500px) {
  .logoHeader {
    width: 80px;
  }
  nav {
    width: 30%;
    padding-top: 40px;
  }
  #selections {
    padding-top: 30px;
  }
}
@media only screen and (max-width: 320px) {
  .logoHeader {
    margin-left: 0px;
  }
  #selections {
    padding-top: 60px;
  }
}
</style>
