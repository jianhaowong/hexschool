<template>
  <div class="container">
    <h1 class="mt-4">後台產品列表</h1>
    <div class="text-end">
      <button class="btn btn-primary" @click="openModal('new')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <!-- 產品列表  key為產品ID-->
        <tr v-for="ProductsAll in products" :key="ProductsAll.id">
          <td>{{ ProductsAll.category }}</td>
          <td>{{ ProductsAll.title }}</td>
          <td class="text-center">{{ ProductsAll.origin_price }}</td>
          <td class="text-center">{{ ProductsAll.price }}</td>
          <td>
            <span v-if="ProductsAll.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <!--將edit狀態及產品ProductsAll帶入 openModal()   -->
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openModal('edit', ProductsAll)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', ProductsAll)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁 -->
    <!--前內後外 內pages 外pagination -->
    <!-- <pagination :pages="pagination" @get-products="getProductsAll"></pagination> -->
  </div>
</template>
<script>
// 輸出 產品列表
export default {
  name: "ProductsView",
  props: ["token"],
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getProducts() {
      // API
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/all`;
      this.$http
        .get(api)
        .then((response) => {
          this.products = response.data.products;
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
