const state = {
    smallSize: ''
}

const getters = {
    getScreenSize(state){
        console.log('gettter is' + state.smallSize)
        return state.smallSize
    }
}

const mutations = {
    smallScreen(state, isSmall){
        state.smallSize = isSmall
        console.log('smallSize' + state.smallSize)
    }
}

const actions = {
    checkScreen({commit}){
        if (window.innerWidth >= 768) {
            commit('smallScreen', false)
        } else {
                commit('smallScreen', true)
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions 
}