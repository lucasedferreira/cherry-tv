import { createWebHistory, createRouter } from "vue-router";
import HomePage from "./views/HomePage";
import AboutMe from "./views/AboutMe";
import AboutEdit from "./views/AboutEdit";

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
  {
    path: "/about/:id",
    name: "AboutEdit",
    component: AboutEdit,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;