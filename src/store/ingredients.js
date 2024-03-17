import axios from 'axios'

const http = axios.create({ baseURL: process.env.VUE_APP_COOKBOOK_API_URL });

export default {
    namespaced: true,
    state: {
        ingredientByUid: {}
    },
    getters: {
        getIngredientByUid: (state) => (ingredientUid) => {
            return state.ingredientByUid[ingredientUid]
        }
    },
    mutations: {
        registerIngredient(state, ingredient) {
            state.ingredientByUid[ingredient.uid] = ingredient;
        }
    },
    actions: {
        async getIngredients(context, {ingredientUIDs}){
            let queryString = "";
            for(let ingredientUID of ingredientUIDs){
                queryString += 'uid=' + encodeURIComponent(ingredientUID) + "&"
            }
            const response = await http.get(
                '/v1/ingredients?' + queryString);
            return response.data;
        },
        async searchIngredients(context, {name}){
            const response = await http.get(
                `/v1/ingredients/search?name=` + encodeURIComponent(name));
            return response.data;
        },
    }
}
