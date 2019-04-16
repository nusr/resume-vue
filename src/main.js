import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "element-ui/lib/theme-chalk/index.css";
import {
  Row,
  Col,
  Form,
  FormItem,
  Notification,
  Loading,
  Input
} from "element-ui";

Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$notify = Notification;
Vue.prototype.$isEmpty = val =>
  val == null || !(Object.keys(val) || val).length;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
