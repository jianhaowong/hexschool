import { createRouter, createWebHashHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
// 這裡是路由表
const routes = [
  {
    path: "/",
    component: () => import("../views/HomeView.vue"),
    children: [
      {
        path: "",
        component: () => import("../views/FrontView.vue"),
      },
      {
        path: "/products",
        name: "產品列表",
        component: () => import("../views/ProductsView.vue"),
      },
      {
        path: "/product",
        name: "產品頁面",
        component: () => import("../views/ProductView.vue"),
      },
      {
        path: "/cart",
        name: "購物車",
        component: () => import("../views/CartView.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/admin",
    component: () => import("../views/AdminView.vue"),
    children: [
      {
        path: "products",
        component: () => import("../views/admin/ProductsView.vue"),
      },
      {
        path: "orders",
        component: () => import("../views/admin/OrdersView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
