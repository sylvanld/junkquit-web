import axios from 'axios'

const http = axios.create({ baseURL: process.env.VUE_APP_COOKBOOK_API_URL });

export default {
    namespaced: true,
    actions: {
        async getByUID(context, recipeUID) {
            const response = await http.get(`/v1/recipes/${recipeUID}`);
            return response.data;
        },
        async create(context, recipe) {
            const response = await http.post('/v1/recipes', recipe);
            return response.data;
        },
        async update(context, { recipeUID, recipe }) {
            const response = await http.put(`/v1/recipes/${recipeUID}`, recipe);
            return response.data;
        },
        async addIngredient(context, { recipeUID, recipeIngredient }) {
            const response = await http.post(`/v1/recipes/${recipeUID}/ingredients`, {
                quantity: recipeIngredient.quantity,
                unit: recipeIngredient.unit,
                ingredient_uid: recipeIngredient.ingredient.uid
            });
            return response;
        },
        async updateIngredient(context, { recipeUID, recipeIngredient }) {
            const response = await http.put(`/v1/recipes/${recipeUID}/ingredients/${recipeIngredient.uid}`, {
                quantity: recipeIngredient.quantity,
                unit: recipeIngredient.unit,
                ingredient_uid: recipeIngredient.ingredient.uid
            });
            return response;
        },
        async deleteIngredient(context, { recipeUID, recipeIngredientUID }) {
            await http.delete(`/v1/recipes/${recipeUID}/ingredients/${recipeIngredientUID}`);
        }
    }
}
