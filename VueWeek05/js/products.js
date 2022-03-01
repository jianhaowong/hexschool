// 引入 vue
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
// 匯入分頁模板
const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const path = 'jianhao';


// 建立 vue 實體
const app = createApp({

    data(){
        return{
            cartData:{},
            products:[],
            productsId:'',
        }
    },
    //方法
    methods:{
        // 取得產品列表
        getProducts(){
            axios.get(`${apiUrl}/api/${path}/products/all`)
            .then((res)=>{
                
                this.products =  res.data.products;
                console.log(this.products);

            });
            console.log("123.");
        },
        // 打開產品Modal
        openProductModal(id){
            
            this.productsId = id ;
            // 觸發下方 產品Modal元件 中 openModal()
            this.$refs.productModal.openModal();


        }
    },

    //生命週期
    mounted(){
        this.getProducts();
    }

});

// 產品Modal元件
app.component('product-modal',{
    // 使用props作接收
    props:['id'],
    template:'#userProductModal',
    data(){
        return{
            // 不同作用域在這定義 modal
            modal:{},
            product:{},
        }
    },
    // 當ID變動時觸動getProduct()
    watch:{
        id(){
            this.getProduct()
        }

    },
    methods:{
        openModal(){
            this.modal.show();
        },
        // 用ID取得原端資料
        getProduct(){
            axios.get(`${apiUrl}/api/${path}/product/${this.id}`)
            .then((res)=>{
                
                this.product =  res.data.product;
                console.log(res);

            });
        }
        
    },
    // 初始化
    mounted(){
        this.modal = new bootstrap.Modal(this.$refs.modal);
        
    },

});

app.mount('#app');


