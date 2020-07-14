import Vue from 'vue'
import Vuex from 'vuex'
import loading from './loading'
import axios from 'axios'
import router from '../router'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        idToken: null,
        userData: null
    },
    mutations: {
        authUser (state, userInfo) {
            state.idToken = userInfo.token
            state.userData = userInfo.user
        },
        clearAuthData (state) {
            state.idToken = null
            state.userData = null
        }
    },
    actions: {
        setLogoutTimer ({commit}, expirationTime) {
            setTimeout(() => {
                commit('clearAuthData')
                this.dispatch('logout')
            }, expirationTime)
        },
        signup ({commit, dispatch}, authData) {
            axios.post('/users/registration', authData)
            axios.post('/authenticate', {
                username: authData.username,
                password: authData.password
            })
                .then(res => {
                    const now = new Date()
                    const expirationDate = now.getTime() + 36000000
                    localStorage.setItem('token', res.data.jwt)
                    localStorage.setItem('userName', authData.username)
                    localStorage.setItem('expirationDate', expirationDate)
                    
                    commit('authUser', {
                        token: res.data.jwt,
                        user: authData.username
                    })
                    dispatch('setLogoutTimer', 36000000)
                    dispatch('showSpinner', false)
                    router.replace('/home')
                })
                .catch(err => alert('something went wrong, please try it again.' + err.message))
                dispatch('showSpinner', false)
                
        },
        login ({commit, dispatch}, authData) {
            axios.post('/authenticate', authData)
                .then(res => {
                    const now = new Date()
                    const expirationDate = now.getTime() + 36000000
                    localStorage.setItem('token', res.data.jwt)
                    localStorage.setItem('userName', authData.username)
                    localStorage.setItem('expirationDate', expirationDate)
                    commit('authUser', {
                        token: res.data.jwt,
                        user: authData.username
                    })
                    dispatch('setLogoutTimer', 36000000)
                    // dispatch('showSpinner', false)
                    router.replace('home')
                })
                .catch(err => {
                    if (err.response.status <= 500 && err.response.status >= 500) {
                        alert('your username or password is incorrect!')
                        dispatch('showSpinner', false)

                    } else { 
                        alert('something went wrong, please try it again.' + err.message)
                    }
                })
                
        },
        tryAutoLogin ({commit}) {
            const token = localStorage.getItem('token')
            if(!token) {
                this.dispatch('logout')
                return
            }
            const expirationDate = localStorage.getItem('expirationDate')
            const now = Date.now()
            if(now >= expirationDate) {
                this.dispatch('logout')
                return
            }
            const userId = localStorage.getItem('userName')
            commit('authUser', {
                token: token,
                user: userId
            })
            router.replace('home')
            
            
            
        },
        checkLoginStatus ({commit, dispatch}) {
            dispatch('showSpinner', true)
            const token = localStorage.getItem('token')
            if(!token) {
                alert('login is expired!Back to re-login again!')
                this.dispatch('logout')
                return
            }
            const expirationDate = localStorage.getItem('expirationDate')
            const now = Date.now()
            if(now >= expirationDate) {
                alert('login is expired! Back to re-login again!')
                this.dispatch('logout')
                return
            }
            const userId = localStorage.getItem('userName')
            commit('authUser', {
                token: token,
                user: userId
            })
            // dispatch('showSpinner', false)
            
        },
        logout ({commit, dispatch}) {
            commit('clearAuthData')
            localStorage.removeItem('expirationDate')
            localStorage.removeItem('token')
            localStorage.removeItem('userName')
            // localStorage.clear() 
            router.replace('/')
            dispatch('showSpinner', false)
        }
    },
    getters: {
        userToken (state) {
            return state.idToken
        },
        isAuthenticated (state) {
            return state.idToken !== null
        },
        userData (state) {
            return state.userData
        }
    },
    modules: {
        loading
    }
})