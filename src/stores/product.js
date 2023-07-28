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
            popupProduct: null,
        }
    },

    actions: {
        async getProducts() {
             await axios.get(`${import.meta.env.VITE_APP_URL}products`)
                .then(res => {
                    this.products = res.data.data
                })
             .finally(v => {
                 $(document).trigger('change')
             })
        },
        async getProduct(id) {
            await axios.get(`${import.meta.env.VITE_APP_URL}products/${id}`)
                .then(res => {
                    this.popupProduct = res.data.data

                })
                .finally(v => {
                    $(document).trigger('change')
                })
        },
    },
})