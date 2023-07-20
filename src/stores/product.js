import { defineStore } from 'pinia'
import router from "../router/index.js";
import {createApp, ref} from "vue";
import axios from "axios";
// const app = createApp(App)
// app.config.globalProperties.axios = axios

export const useProductStore = defineStore('product', {
    state: () => {
        return {
            products: null,
        }
    },

    actions: {
        async getProducts() {
             await axios.get(`${import.meta.env.VITE_APP_URL}products`)
                .then(res => {
                    this.products = res.data.data
                    console.log(res);
                })
             .finally(v => {
                 $(document).trigger('change')
             })
        },
    },
})