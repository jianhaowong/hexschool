<template>
  <div class="container-fluid">
    <div class="container pt-md-3">
      <h2>首頁</h2>
      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-bs-ride="carousel"
        ref="carouse"
      >
        <div class="carousel-inner">
          <div
            class="carousel-item"
            v-for="(item, index) in products"
            :key="item.id"
          >
            <img
              class="d-block w-100 active"
              :src="item.imageUrl"
              :alt="index"
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "FrontView",
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
        this.carousel;
      });
    },
  },
  // 初始化
  mounted() {
    this.getProducts();
  },
};
</script>
