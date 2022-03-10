<template>
  <div class="container-fluid">
    <!--  -->
    <div class="container pt-md-3">
      <h2>產品列表</h2>
      <table class="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td style="width: 200px">
              <!--:style 為物件刑式  -->
              <div
                :style="{ backgroundImage: `url(${item.imageUrl})` }"
                style="
                  height: 100px;
                  background-size: cover;
                  background-position: center;
                "
              ></div>
            </td>
            <td>{{ item.title }}</td>
            <td>
              <!-- 有特價時顯示特價 不然顯示原價 -->
              <div class="h5" v-if="item.price === item.origin_price">
                {{ item.price }} 元
              </div>
              <div v-else>
                <del class="h6">原價 {{ item.origin_price }} 元</del>
                <div class="h5">現在只要 {{ item.price }} 元</div>
              </div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button type="button" class="btn btn-outline-secondary">
                  <i class="fas fa-spinner fa-pulse"></i>
                  查看更多
                </button>
                <button type="button" class="btn btn-outline-danger">
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
// 輸出 產品列表
export default {
  name: "ProductsView",
  data() {
    return {
      products: [],
    };
  },
  // 方法
  methods: {
    // 取得產品列表
    getProducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products`;
      this.$http.get(url).then((res) => {
        this.products = res.data.products;
        console.log(this.products);
      });
    },
  },
  // 初始化
  mounted() {
    this.getProducts();
  },
};
</script>
