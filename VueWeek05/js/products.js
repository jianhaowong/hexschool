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
        }
    },
    //方法
    methods:{
        getProducts(){
            axios.get(`${apiUrl}/api/${path}/products/all`)
            .then((res)=>{
                
                this.products =  res.data.products;
                console.log(this.products);

            });
            console.log("123.");
        }
    },
    //生命週期
    mounted(){
        this.getProducts();
    }

});

app.mount('#app');


