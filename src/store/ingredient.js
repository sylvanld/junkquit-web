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
}
