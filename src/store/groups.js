import axios from 'axios'

const http = axios.create({ baseURL: process.env.VUE_APP_COOKBOOK_API_URL });

export default {
    namespaced: true,
    state: {
        selectedGroup: null,
        groups: [],
    },
    mutations: {
        setGroups(state, groups) {
            state.groups = groups;
        },
        setDefault(state, group) {
            state.selectedGroup = group
        },
        add(state, group) {
            state.groups.push(group);
        }
    },
    actions: {
        async load(context) {
            const response = await http.get("/v1/groups");
            this.groups = context.commit("setGroups", response.data);
            this.selectedGroup = context.commit("setDefault", response.data[0]);
            return response.data;
        },
        async create(context, { group }) {
            const response = await http.post("/v1/groups", group);
            return response.data;
        },
        async addRecipeToList(context, { recipe_uid, diners }) {
            const selectedGroupUID = context.state.selectedGroup.uid;
            const response = await http.post(`/v1/groups/${selectedGroupUID}/list/recipes`, { recipe_uid, diners });
            return response.data;
        },
        async getListRecipes(context) {
            const selectedGroupUID = context.state.selectedGroup.uid;
            const response = await http.get(`/v1/groups/${selectedGroupUID}/list/recipes`);
            return response.data;
        }
    }
}
