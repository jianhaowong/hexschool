<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">茶金</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/"> 首頁 </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">
              前台產品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cart"> 購物車 </router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-md btn-dark" to="/admin/products">
              後台
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- 放各個路由頁面的地方 -->
  <router-view></router-view>
</template>

<script>
// 元件 出口
export default {
  name: "HomeView",
  data() {
    return {};
  },
};
</script>
