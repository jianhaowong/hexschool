<template>
  <div class="container-fluid">
    <div class="container pt-md-3">
      <h2>購物車</h2>

      <!-- 購物車列表 -->
      <div class="text-end">
        <button class="btn btn-outline-danger" type="button">清空購物車</button>
      </div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th>單價</th>
          </tr>
        </thead>
        <tbody>
          <!--  -->
          <template v-if="cartData.carts">
            <tr v-for="cartItem in cartData.carts" :key="cartItem.id">
              <td>
                <button type="button" class="btn btn-outline-danger btn-sm">
                  <i class="fas fa-spinner fa-pulse"></i>
                  x
                </button>
              </td>
              <td>
                {{ cartItem.product.title }}
                <div class="text-success">已套用優惠券</div>
              </td>
              <td>
                <div class="input-group input-group-lg">
                  <div class="input-group mb-3">
                    <select
                      id=""
                      class="form-select"
                      v-model="cartItem.qty"
                      @change="updataCart(cartItem)"
                      :disabled="LoadingItem === cartItem.id"
                    >
                      <option
                        :value="num"
                        v-for="num in 20"
                        :key="`${num}${cartItem.id}`"
                      >
                        {{ num }}
                      </option>
                    </select>
                    <span class="input-group-text" id="basic-addon2">{{
                      cartItem.product.unit
                    }}</span>
                  </div>
                </div>
              </td>
              <td class="text-end">
                {{ cartItem.total }}
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ cartData.total }}</td>
          </tr>
          <tr>
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">{{}}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>
<script>
// 元件 出口
export default {
  name: "CartView",
  data() {
    return {
      cartData: {
        carts: [],
      },
    };
  },
  // 方法
  methods: {
    // 取得產品列表
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url).then((res) => {
        this.cartData = res.data.data;
      });
    },
  },
  // 初始化
  mounted() {
    this.getCart();
  },
};
</script>
