/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

import Vue from "vue";
// Vue plugins
import VueRouter from "vue-router";
import store from "./plugins/store";
import vuetify from "./plugins/vuetify";

Vue.use(VueRouter)
// Components
import App from "./components/App";
import HomeView from "./components/views/HomeView";

// Routes
const routes = [
    {path: "/", component: HomeView}
]
const router = new VueRouter({
    routes,
    mode: 'history'
})

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App),
    el: "#app"
})


// start the Stimulus application
// import './bootstrap';

