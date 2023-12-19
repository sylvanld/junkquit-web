import axios from 'axios'

class ShoppingClient {
    constructor({ shoppingApiUrl }) {
        this.session = axios.create({ baseURL: shoppingApiUrl });
    }
}

export default new ShoppingClient({ shoppingApiUrl: process.env.VUE_APP_SHOPPING_API_URL });
