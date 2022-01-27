
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
// 引入 vue


createApp({
    // 資料
    data() {
        return {
            api: 'https://vue3-course-api.hexschool.io',
            path: 'jianhao',
            temp: {},//產品暫存
            products: [],
        }
    },
    // 方法
    methods: {
        //驗證是否有登入
        checkLogin() {

            axios.post(`${this.api}/v2/api/user/check`)
                // 使用post方法與驗證API 串接
                .then((res) => { // 正確資訊


                    //執行 取得產品函式
                    this.getProducts()

                })
                .catch((err) => {
                    alert(err.data.message)
                    //驗證不通過 轉回上一頁
                    window.location = 'index.html';
                })
        },
        // 取得產品函式
        getProducts() {

            axios.get(`${this.api}/v2/api/${this.path}/admin/products`)// 使用post方法與產品API 串接

                .then((res) => { // 正確資訊
                    this.products = res.data.products;

                })
                .catch((err) => {
                    console.log(err.data.message)
                })

        },
        openProduct() {
            this.temp = item;
        }


    },
    // 生命週期 頁面初始化執行
    mounted() {
        // 取出存在瀏覽器的 token
        const myToken = document.cookie.replace(/(?:(?:^|.*;\s*)jianToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        console.log(myToken);
        // 發送 axios時 預設將Token存入headers裡
        axios.defaults.headers.common.Authorization = myToken;
        //呼叫驗證函式
        this.checkLogin();

    }
}).mount('#app')