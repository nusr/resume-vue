import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/resume",
      name: "Résumé",
      component: () => import("./views/Resume.vue")
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.query && to.query.name) {
    window.document.title = `${to.query.name}'s Résumé`;
  }
  next();
});
router.afterEach(() => {});
export default router;
