
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


    }
}).mount('#app')