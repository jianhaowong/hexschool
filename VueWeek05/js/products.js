// 引入 vue
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

// VeeValidate 套件
const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

// VeeValidate 套件設定
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

// VeeValidate 套件語言設定  繁體中文
loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

configure({
    generateMessage: localize('zh_TW'),
});

// 匯入分頁模板
const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const path = 'jianhao';


// 建立 vue 實體
const app = createApp({

    data() {
        return {
            cartData: {},
            products: [],
            productsId: '',
            // 
            LoadingItem: '',
            // 表單要的資料
            form: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: '',
                },
                message: '',
            },


        }
    },
    // 將套件註冊到區域
    components: {
        VForm: Form,
        VField: Field,
        ErrorMessage: ErrorMessage,
      },
    //方法
    methods: {
        // 取得產品列表
        getProducts() {
            axios.get(`${apiUrl}/api/${path}/products/all`)
                .then((res) => {

                    this.products = res.data.products;
                    console.log(this.products);

                });

        },
        // 打開產品Modal
        openProductModal(id) {

            this.productsId = id;
            // 觸發下方 產品Modal元件 中 openModal()
            this.$refs.productModal.openModal();


        },
        // 取得購物車
        getCart() {
            axios.get(`${apiUrl}/api/${path}/cart`)
                .then((res) => {

                    this.cartData = res.data.data;
                    console.log(res);

                });
        },
        // 加入購物車 (帶入產品ID , 參數預設值為1)
        addCart(id, qty = 1) {
            const data = {
                product_id: id,
                qty,
            }
            this.LoadingItem = id;
            axios.post(`${apiUrl}/api/${path}/cart`, {
                    data
                })
                .then((res) => {

                    // this.cartData.products =  res.data.products;
                    console.log(res);
                    this.getCart()
                    this.LoadingItem = ' ';
                    this.$refs.productModal.closeModal();
                });
        },
        // 刪除單個購物車
        delCartItem(id) {
            this.LoadingItem = id;
            axios.delete(`${apiUrl}/api/${path}/cart/${id}`)
                .then((res) => {
                    this.getCart()
                    this.LoadingItem = ' ';
                });
        },
        // 更新購物車
        updataCart(item) {
            const data = {
                product_id: item.id,
                qty: item.qty,
            }
            this.LoadingItem = item.id;
            axios.put(`${apiUrl}/api/${path}/cart/${item.id}`, {
                    data
                })
                .then((res) => {

                    // this.cartData.products =  res.data.products;
                    console.log(res);
                    this.getCart()
                    this.LoadingItem = ' ';
                });
        },
        // 清空購物車
        delAllCarts() {
            axios.delete(`${apiUrl}/api/${path}/carts`)
                .then((res) => {
                    alert("購物車以清空");
                    this.getCart()
                }).catch((err) => {
                    alert(err.data.message);
                });
        },
        createOrder(){
            const order = this.form;
            axios.post(`${apiUrl}/api/${path}/order`,{data: order})
                .then((res) => {
                    alert(res.data.message);
                    // 表單送出後清空 resetForm()此為套件方法
                    this.$refs.form.resetForm();
                    this.getCart();
                }).catch((err) => {
                    alert(err.data.message);
                });
        }

    },

    //生命週期
    mounted() {
        this.getProducts();
        this.getCart();
    }

});

// 產品Modal元件
app.component('product-modal', {
    // 使用props作接收
    props: ['id'],
    template: '#userProductModal',
    data() {
        return {
            // 不同作用域在這定義 modal
            modal: {},
            product: {},
            qty: 1,
        }
    },
    // 當ID變動時觸動getProduct()
    watch: {
        id() {
            this.getProduct()
        }

    },
    methods: {
        openModal() {
            this.modal.show();
        },
        closeModal() {
            this.modal.hide();
        },
        // 用ID取得原端資料
        getProduct() {
            axios.get(`${apiUrl}/api/${path}/product/${this.id}`)
                .then((res) => {

                    this.product = res.data.product;
                    console.log(res);

                });
        },
        addCart() {
            this.$emit('add-cart', this.product.id, this.qty);

        }

    },
    // 初始化
    mounted() {
        this.modal = new bootstrap.Modal(this.$refs.modal);

    },

});

app.mount('#app');