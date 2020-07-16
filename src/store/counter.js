import axios from 'axios'

const state = {
    projects: 0,
    bugs: 0
}

const getters = {
    getProjects(state) {
        return state.projects
    },
    getBugs(state) {
        return state.bugs
    }
}

const mutations = {
    addCount(state, counters){
        state.projects = counters.projectNum
        state.bugs = counters.bugNum
    }
            
        
        
    
    
}

const actions = {
    fetchCount({commit, dispatch}) {
        let projectNum
        let bugNum
        axios.all([
            axios.get('/projects', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            }),
            axios.get('/projects/bugs', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            })
        ])
        .then(responseArr => {
            if (responseArr[0].data.length === 0) {
                projectNum = 0;
            } else {
                projectNum = responseArr[0].data.length;
            }	
            if (responseArr[1].data === undefined) {
                bugNum = 0;
            } else {
                bugNum = responseArr[1].data.bug_count;
            }

            commit('addCount', 
                {
                projectNum: projectNum, 
                bugNum: bugNum
                }
            )
            console.log('first job is done')
        })
        .then(() => {
            dispatch('showSpinner', false)
            console.log('second job is done')
        })
        .catch (err => {
            alert('something went wrong, please try it again.' + err.message)
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}