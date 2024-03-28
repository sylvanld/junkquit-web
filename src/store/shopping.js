import axios from 'axios'

const http = axios.create({
    baseURL: process.env.VUE_APP_SHOPPING_API_URL
})

export default {
    namespaced: true,
    actions: {
        async getCart(context, { groupUID }) {
            const response = await http.get(`/v1/groups/${groupUID}/cart`);
            return response.data;
        },
        async addBatch(context, { groupUID, batchUID, name, type, scale, items }) {
            try {
                await http.post(`/v1/groups/${groupUID}/checklist/batch`, { batchUID, name, type, scale, items });
            } catch (error) {
                if (error.response.status === 409) {
                    alert("Recipe is already in shopping list.")
                }
            }
        },
        async getBatches(context, { groupUID }) {
            const response = await http.get(`/v1/groups/${groupUID}/checklist/batch`);
            return response.data;
        },
        async updateRecipe(context, { groupUID, recipe }) {
            const response = await http.put(`/v1/groups/${groupUID}/checklist/batch/${recipe.uid}`, { name: recipe.name, scale: recipe.scale });
            return response.data;
        },
        async deleteRecipe(context, { groupUID, recipeUID }) {
            await http.delete(`/v1/groups/${groupUID}/checklist/batch/${recipeUID}`);
        }
    }
}
