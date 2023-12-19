export default class RecipeInstrumentation {
    constructor(recipe) {
        this.recipe = recipe;
    }
    isEqual(recipeB) {
        if (!this.recipe && !recipeB) {
            return true;
        }
        return (
            this.recipe.name === recipeB.name &&
            this.recipe.thumbnail_url === recipeB.thumbnail_url &&
            this.recipe.duration_minutes === recipeB.duration_minutes &&
            this.recipe.diners === recipeB.diners &&
            this.recipe.price === recipeB.price
        );
    }
    copy() {
        return {
            name: this.recipe.name,
            thumbnail_url: this.recipe.thumbnail_url,
            duration_minutes: this.recipe.duration_minutes,
            diners: this.recipe.diners,
            price: this.recipe.price,
        };
    }
}
