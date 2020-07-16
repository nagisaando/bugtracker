const state = {
    topPageloading: false
}
const getters = {
    checkTopPageLoading(state) {
        return state.topPageloading
    }
}

const mutations = {
    topPagechangeLoading(state, boolean) {
        state.topPageloading = boolean
    }
}

const actions = {
    topPageshowSpinner({commit}, boolean) {
        commit('topPagechangeLoading', boolean)
    }
}

export default {
    state,
    getters,
    mutations, 
    actions
}