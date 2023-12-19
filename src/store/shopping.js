import axios from 'axios'

const http = axios.create({
    baseURL: process.env.VUE_APP_SHOPPING_API_URL
})

export default {
    namespaced: true,
    actions: {
        async getLists() {
            const response = await http.get("/v1/carts");
            return response.data.items;
        }
    }
}
