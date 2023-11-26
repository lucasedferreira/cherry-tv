import { createWebHistory, createRouter } from "vue-router";
import { User } from "@/services/User";
import LoginPage from "./views/LoginPage";
import HomePage from "./views/HomePage";
import AboutMe from "./views/AboutMe";
import AboutEdit from "./views/AboutEdit";
import VideoRegister from "./views/VideoRegister";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/about",
    name: "About",
    component: AboutMe,
  },
  {
    path: "/about/:id",
    name: "AboutEdit",
    component: AboutEdit,
  },
  {
    path: "/video-register",
    name: "VideoRegister",
    component: VideoRegister,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLogged = "id" in User;
  if (to.name !== "Login" && !isLogged) {
    next({ name: "Login" });
    return;
  }

  if (to.name !== "VideoRegister" && isLogged && localStorage.getItem('tutorial') === "firstVideo") {
    next({ name: "VideoRegister" });
    return;
  }

  next();
});

export default router;
