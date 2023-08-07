import { createWebHistory, createRouter } from "vue-router";
import HomePage from "./views/HomePage";
import AboutMe from "./views/AboutMe";

const routes = [
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;