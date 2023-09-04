import SHELVES from "@/constants/shelves";

const UID_ALPHA = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
const UID_ALPHA_LENGTH = UID_ALPHA.length;

function randInt(n) {
    return Math.floor(Math.random() * n);
}

function generateUID() {
    let uid = "";
    for (let k = 0; k < 12; k++) {
        const i = randInt(UID_ALPHA_LENGTH);
        uid += UID_ALPHA[i];
    }
    return uid;
}

export default {
    namespaced: true,
    state: {
        ingredients: [],
        ingredientActive: {}
    },
    getters: {
        items(state) {
            console.log('In getter')
            const shelvesByID = {};
            for (let shelve of SHELVES) {
                shelvesByID[shelve.id] = Object.assign(
                    { active: false, items: [] },
                    shelve
                );
            }

            for (let ingredient of state.ingredients) {
                const shelve = shelvesByID[ingredient.shelve];
                shelve.items.push(Object.assign({ active: state.ingredientActive[ingredient.uid] == true || false }, ingredient));
            }

            const shelves = [];
            for (let shelve of Object.values(shelvesByID)) {
                if (shelve.items.length > 0) {
                    let counter = 0;
                    for (let item of shelve.items) {
                        if (!item.active) {
                            counter += 1;
                        }
                    }
                    shelve.nb_items = counter;

                    shelves.push(shelve);
                }
            }
            console.log('reloading')
            return shelves;
        }

    },
    mutations: {
        setIngredients(state, ingredients) {
            state.ingredients = ingredients;
        },
        addIngredient(state, ingredient) {
            state.ingredients.push(Object.assign({ uid: generateUID() }, ingredient));
        },
        toggleItem(state, itemUID) {
            const current = state.ingredientActive[itemUID] == true || false;
            state.ingredientActive = {
                ...state.ingredientActive,
                [itemUID]: !current
            }
            console.log('mutating')
        }
    },
    actions: {

    },
}
