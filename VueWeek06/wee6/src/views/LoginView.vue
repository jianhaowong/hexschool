<template>
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      <div class="col-8">
        <form id="form" class="form-signin" @submit.prevent="login">
          <div class="form-floating mb-3">
            <input
              v-model="user.username"
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              required
              autofocus
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              v-model="user.password"
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
            />
            <label for="password">Password</label>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
            登入
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
// 元件 出口
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    login() {
      const api = `${process.env.VUE_APP_API}admin/signin`;
      this.$http
        .post(api, this.user)
        // 使用post方法與API 串接
        .then((res) => {
          // 正確資訊

          const { token, expired } = res.data;
          // 從api取出token 時間 宣告常數
          document.cookie = `jianToken=${token}; expires=${new Date(expired)};`;
          // 將token及轉型後的時間 存在瀏覽器 myCookieName為自訂名稱
          // 登入成功後 到產品頁
          this.$router.push("/admin/products");
          console.log(res);
        })
        .catch((error) => {
          // 錯誤資訊
          alert(error.data.message); // 錯誤訊息
        });
    },
  },
};
</script>
