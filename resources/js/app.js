/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
require("./bootstrap");

import { createApp } from "vue";
import { createStore } from "vuex";
import { router } from "./routes";
import App from "./App.vue";
import JlDatatable from "jl-datatable";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faBars,
    faPenToSquare,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// import JQuery from "jquery";
const app = createApp(App);
//add fontawsome icons
library.add(faBars);
library.add(faPenToSquare);
library.add(faTrashCan);
app.component("font-awesome-icon", FontAwesomeIcon);
//data table
app.component("jl-datatable", JlDatatable);
const store = createStore({
    state() {
        return {
            reload: false,
        };
    },
    mutations: {
        changedata(state) {
            if (state.reload) {
                state.reload = false;
                // console.log(state.reload);
            } else {
                state.reload = true;
                // console.log(state.reload);
            }
        },
    },

    actions: {
        changedata({ commit }) {
            commit("changedata");
        },
    },
});

app.use(store);
app.use(router);
app.mount("#app");

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Vue.component(
//     "example-component",
//     require("./components/ExampleComponent.vue").default
// );
// Vue.component("user-list", require("./components/list.vue").default);
// Vue.component("user-form", require("./components/form.vue").default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
