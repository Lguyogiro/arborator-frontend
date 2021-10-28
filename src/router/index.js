// import VueRouter from 'vue-router' // vue2
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import store from "../store/index.js"
import { route } from 'quasar/wrappers';

import routes from './routes'


/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */
export default route((/* { store, ssrContext } */) =>{
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);
  
    const Router = createRouter({
      history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE),

    scrollBehavior: () => ({ left: 0, top: 0 }),
    // mode: 'history',
    // hash: false,
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    // mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
    afterEach: to => {
      // aftereach is outsideshow_all_trees

    }
  })

  // Router.onError(error => {
  //   if (/loading chunk \d* failed./i.test(error.message)) {
  //     window.location.reload()
  //   }
  // })

  /*
  * After each routing, check if it lands on a project.
  * if yes, check if it's a different project from the previous one
  * if yes, fetch the config of the project (annotation and display)
  */
  Router.afterEach((to, from) => {
    if (to.params.projectname && to.params.projectname !== from.params.projectname) {
      // store.dispatch('config/fetchProjectConlluSchema', {projectname: to.params.projectname})
      store.dispatch("config/fetchProjectSettings", {projectname: to.params.projectname})
    }
    if (to.params.kprojectname) {
      store.dispatch("config/fetchKlangProjectSettings", {
        projectname: to.params.kprojectname
      });
    } 
  });

  return Router
});
