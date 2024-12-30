import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import { default as ChatIndex } from "@/pages/Chat/index.vue";
import Home from "@/pages/Home/index.vue"
import Dialog from "@/pages/Dialog/index.vue"

const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  { path: "/dialog", redirect: "/dialog/chat/demoid" },
  { path: "/dialog/:type/:id", component: Dialog },
  // { path: "/workflow", component: Workflow },
  // { path: "/chat", component: ChatIndex },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
