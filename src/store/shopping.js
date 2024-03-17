import axios from 'axios'

const http = axios.create({
    baseURL: process.env.VUE_APP_SHOPPING_API_URL
})

export default {
    namespaced: true,
    actions: {
        async getCart(context, {groupUID}){
            const response = await http.get(`/v1/groups/${groupUID}/cart`);
            return response.data;
        },
        async addBatch(context, { groupUID, batchUID, name, type, scale, items }) {
            try {
                await http.post(`/v1/groups/${groupUID}/cart/batch`, { batchUID, name, type, scale, items });
            } catch (error) {
                if (error.response.status === 409) {
                    alert("Recipe is already in shopping list.")
                }
            }
        },
        async getBatches(context, {groupUID}){
            const response = await http.get(`/v1/groups/${groupUID}/cart/batch`);
            return response.data;
        }
    }
}
