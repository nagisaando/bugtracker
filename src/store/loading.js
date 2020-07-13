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
        console.log(state.loading)
    }
}

const actions = {
    showSpinner({commit}, boolean) {
        console.log('loadding starts')
        commit('changeLoading', boolean)
    }
}

export default {
    state,
    getters,
    mutations, 
    actions
}