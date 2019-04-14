import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  },
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
    }
  ]
});
router.beforeEach((to, from, next) => {
  console.log(to, from);
  if (to.query && to.query.name) {
    window.document.title = `${to.query.name}'s Résumé`;
  }
  next();
});
router.afterEach(() => {
});
export default router;
