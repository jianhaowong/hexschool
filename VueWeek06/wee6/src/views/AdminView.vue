/* eslint-disable no-useless-escape */
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">後台頁面</a>
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
            <router-link class="nav-link" to="/"> 前台首頁 </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products">
              後台產品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/orders">
              後台訂單
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- 放各個路由頁面的地方 -->
  <router-view v-if="check"></router-view>
</template>

<script>
// 元件 出口
export default {
  name: "AdminView",
  data() {
    return {
      check: false,
    };
  },
  methods: {
    //驗證是否有登入
    checkLogin() {
      // 取出存在瀏覽器的 token'
      const myToken = document.cookie.replace(
        // eslint-disable-next-line no-useless-escape
        /(?:(?:^|.*;\s*)jianToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );

      if (myToken) {
        // 發送 axios時 預設將Token存入headers裡
        this.$http.defaults.headers.common.Authorization = `${myToken}`;
        const api = `${process.env.VUE_APP_API}api/user/check`;
        this.$http
          .post(api)
          // 使用post方法與驗證API 串接
          .then((res) => {
            // 正確資訊
            this.check = true;
            console.log(res);
          })
          .catch((error) => {
            alert(error.data.message);
            //驗證不通過 轉回上一頁
            this.$router.push("/login");
          });
      } else {
        alert("您尚未登入。");
        this.$router.push("/login");
      }
    },
  },
  // 生命週期 頁面初始化執行
  mounted() {
    //呼叫驗證函式
    this.checkLogin();
  },
};
</script>
