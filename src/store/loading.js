const state = {
    loading: false
}
const getters = {
    checkLoading(state) {
        return state.loading
    }
}

const mutations = {
    changeLoading(state, boolean) {
        state.loading = boolean
    }
}

const actions = {
    showSpinner({commit}, boolean) {
        commit('changeLoading', boolean)
    }
}

export default {
    state,
    getters,
    mutations, 
    actions
}