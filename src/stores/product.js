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
            filterList: [],
        }
    },

    actions: {
        async getProducts() {
             await axios.get(`${import.meta.env.VITE_APP_URL}products`)
                .then(res => {
                    this.products = res.data.data
                })
             .finally(v => {
                 $(document).trigger('init')
             })
        },
        async getFilterList() {
            await axios.get(`${import.meta.env.VITE_APP_URL}products/filters`)
                .then(res => {
                    this.filterList = res.data

                    //  Price Filter
                    if ($("#price-range").length) {
                        $("#price-range").slider({
                            range: true,
                            min: this.filterList.price.min,
                            max: this.filterList.price.max,
                            values: [this.filterList.price.min, this.filterList.price.max],
                            slide: function (event, ui) {
                                $("#priceRange").val("$" + ui.values[0] + " - $" + ui.values[1]);
                            }
                        });
                        $("#priceRange").val("$" + $("#price-range").slider("values", 0) + " - $" + $("#price-range").slider("values", 1));
                    }

                })
                .finally(v => {
                    $(document).trigger('init')
                })
        },
        async getProduct(id) {
            await axios.get(`${import.meta.env.VITE_APP_URL}products/${id}`)
                .then(res => {
                    this.popupProduct = res.data.data
                    console.log(this.popupProduct)
                })
                .finally(v => {
                    $(document).trigger('init')
                })
        },
    },
})