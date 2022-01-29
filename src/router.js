import VueRouter from "vue-router";
import Vue from "vue";
import MainCompHandler from "./components/MainCompHandler"
import Testing from "./components/MainHandler.vue";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: "/",
            name: "MainCompHandler",
            component: MainCompHandler
        },
        {
            path: "/facetrend",
            name: "Testing",
            component: Testing
        }
    ],
    mode: "history"
});