import VueRouter from "vue-router";
import Vue from "vue";
import Main from "./components/Main.vue";
import Testing from "./components/MainHandler.vue";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: "/",
            name: "Main",
            component: Main
        },
        {
            path: "/facetrend",
            name: "Testing",
            component: Testing
        }
    ],
    mode: "history"
});