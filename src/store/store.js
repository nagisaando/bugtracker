import Vue from 'vue'
import Vuex from 'vuex'
import userService from './userService'
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
            console.log(userInfo)
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
            console.log(expirationTime)
            setTimeout(() => {
                commit('clearAuthData')
                this.dispatch('logout')
            }, expirationTime)
        },
        signup ({commit, dispatch}, authData) {
            console.log(authData)
            axios.post('/users/registration', authData)
                .then(res => {
                    console.log(res)
                })
            axios.post('/authenticate', {
                username: authData.username,
                password: authData.password
            })
                .then(res => {
                    console.log(res)
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
                    router.replace('/home')
                })
                .catch(err => console.log(err))
                
        },
        login ({commit, dispatch}, authData) {
            console.log('logging in///')
            axios.post('/authenticate', authData)
                .then(res => {
                    console.log(res)
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
                    router.replace('home')
                })
                .catch(err => console.log(err))
                
        },
        tryAutoLogin ({commit}) {
            console.log('checking')
            const token = localStorage.getItem('token')
            if(!token) {
                console.log('no token')
                this.dispatch('logout')
                return
            }
            const expirationDate = localStorage.getItem('expirationDate')
            const now = Date.now()
            console.log('now ' + now)
            console.log('expire ' + expirationDate)
            
            if(now >= expirationDate) {
                console.log('date expired')
                router.replace('/')
                this.dispatch('logout')
                return
            }
            const userId = localStorage.getItem('userName')
            commit('authUser', {
                // token: token,
                user: userId
            })
            console.log('reload to home')
            router.replace('home')
            
            
        },
        checkLoginStatus ({commit}) {
            console.log('checking')
            const token = localStorage.getItem('token')
            if(!token) {
                alert('login is expired!Back to re-login again!')
                console.log('no token')
                this.dispatch('logout')
                return
            }
            const expirationDate = localStorage.getItem('expirationDate')
            const now = Date.now()
            if(now >= expirationDate) {
                alert('login is expired! Back to re-login again!')
                console.log('date expired')
                this.dispatch('logout')
                return
            }
            const userId = localStorage.getItem('userName')
            commit('authUser', {
                token: token,
                user: userId
            })
            
        },
        logout ({commit}) {
            commit('clearAuthData')
            localStorage.removeItem('expirationDate')
            localStorage.removeItem('token')
            localStorage.removeItem('userName')
            // localStorage.clear() 
            router.replace('signin')
        }
    },
    getters: {
        userToken (state) {
            return state.idToken
        },
        isAuthenticated (state) {
            return state.idToken !== null
        }
    },
    modules: {
        userService
    }
})