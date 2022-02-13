
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
// 引入 vue
let productModal = null;
let delproductModal = null;

createApp({
    // 資料
    data() {
        return {
            api: 'https://vue3-course-api.hexschool.io',
            path: 'jianhao',
            temp: { imagesUrl: [], },
            products: [],
            isNew: false,
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
                    this.getProductsAll()

                })
                .catch((err) => {
                    alert(err.data.message)
                    //驗證不通過 轉回上一頁
                    window.location = 'index.html';
                })
        },
        // 取得全部產列表函式
        getProductsAll() {

            axios.get(`${this.api}/v2/api/${this.path}/admin/products/all`)// 使用post方法與產品API 串接

                .then((res) => { // 正確資訊
                    this.products = res.data.products;

                })
                .catch((err) => {
                    console.log(err.data.message)
                })

        },
        openProduct(item) {
            this.temp = item;
        },
        openModal(isNew, item) {
            // 判斷 打開Modal 是哪種功能
            if (isNew === 'new') {
                // 如果按下是新增產品
                this.temp = {
                    imagesUrl: [],
                }
                this.isNew = true;
                productModal.show();
            } else if (isNew === 'edit') {
                // 如果按下是編輯產品
                this.temp = { ...item }
                productModal.show();
                this.isNew = false;
                productModal.show();

            } else if (isNew === 'delete') {
                // 如果按下是刪除產品
                this.temp = { ...item }
                delproductModal.show()
            }





        },
        updateProduct() {

            axios.post(`${this.api}/v2/api/${this.path}/admin/products/${this.temp}`)// 使用post方法與產品API 串接

                .then((res) => { // 正確資訊
                    this.products = res.data.products;

                })
                .catch((err) => {
                    console.log(err.data.message)
                })

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

        // BS5  Modal 
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false
        });

        delproductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
            keyboard: false
        });



    }
}).mount('#app')