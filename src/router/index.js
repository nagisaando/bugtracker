import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../components/Projects/Projects.vue')
  },
  {
    path: '/submitProject',
    name: 'ProjectSubmit',
    component: () => import('../components/Projects/ProjectSubmit.vue')
  },
  {
    path: '/projectDetail/:id',
    name: 'ProjectDetailParent',
    component: () => import('../components/Projects/Project.vue'),
    children: [
      {
        path: "",
        name: 'projectDetail',
        component: () => import('../components/Projects/ProjectDetail.vue')
      },
      {
        path: 'projectEdit',
        name: 'projectEdit',
        component: () => import('../components/Projects/ProjectEdit.vue')
      },
      {
        path: 'submitBug',
        name: 'bugSubmit',
        component: () => import('../components/Bugs/BugSubmit.vue')
      },
      {
        path: 'bugDetail/:bugId',
        name: 'bugDetail',
        component: () => import('../components/Bugs/BugDetail.vue')
      },
      {
        path: 'BugEdit/:bugId',
        name: 'BugEdit',
        component: () => import('../components/Bugs/BugEdit.vue')
      }
    ]
  },
 
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

// export default new Router({  
//   mode: 'history',
//   routes: []
// })

export default router
// export default new Router({  
 
//   routes: []
// })