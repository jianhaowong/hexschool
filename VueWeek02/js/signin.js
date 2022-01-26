
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
// 引入 vue


createApp({
    // 資料
    data() {
        return {
            api: 'https://vue3-course-api.hexschool.io/v2/admin/signin',
            path: 'jianhao',
            user: {
                username: '',
                password: '',
            },

        }
    },
    // 方法
    methods: {
        login() {
            axios.post(`${this.api}`, this.user)
                // 使用post方法與API 串接
                .then((res) => { // 正確資訊

                    const { token, expired } = res.data;
                    // 從api取出token 時間 宣告常數
                    document.cookie = `myCookieName=$P}${token}; expires=${new Date(expired)};`
                    // 將token及轉型後的時間 存在瀏覽器 myCookieName為自訂名稱
                    window.location = 'products.html'
                    // 登入成功後 到產品頁


                    // console.log(res);
                    // console.log(token, expired);

                })
                .catch((error) => { // 錯誤資訊

                    console.dir(error);
                    alert(error.data.message)// 錯誤訊息

                })


        }

    }
}).mount('#app')