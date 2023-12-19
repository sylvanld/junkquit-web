import axios from 'axios'

function buildQueryString(query) {
    if (!query) {
        return ""
    }

    let components = [];
    for (let key of Object.keys(query)) {
        components.push(key + "=" + query[key]);
    }
    return "?" + components.join("&")
}

class CookbookClient {
    constructor({ cookbookApiUrl }) {
        this.session = axios.create({ baseURL: cookbookApiUrl });
    }

    async getRecipeByUid(recipeUid) {
        const response = await this.session.get(`/v1/recipes/${recipeUid}`);
        return response.data;
    }

    async searchRecipes(query) {
        const response = await this.session.get('/v1/recipes' + buildQueryString(query));
        return response.data;
    }

    async deleteRecipeByUid(recipeUid) {
        await this.session.delete(`/v1/recipes/${recipeUid}`);
    }
}

export default new CookbookClient({ cookbookApiUrl: process.env.VUE_APP_COOKBOOK_API_URL });
