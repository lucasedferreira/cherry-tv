import { createWebHistory, createRouter } from "vue-router";
import { User } from "@/services/User";
import LoginPage from "./views/LoginPage";
import HomePage from "./views/HomePage";
import AboutMe from "./views/AboutMe";
import AboutEdit from "./views/AboutEdit";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLogged = "id" in User;
  if (to.name !== "Login" && !isLogged) next({ name: "Login" });
  else next();
});

export default router;
