import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'welcome',
    component: () => import('../components/Welcome/Welcome.vue')
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: () => import('../components/Login/Signin.vue')
  },
  {
    path: '/signUp',
    name: 'signup',
    component: () => import('../components/Login/Signup.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
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
      },
    ]
  },
  {
    path :'*',
    component: () => import('../views/Error.vue')
  }
 
]

const router = new VueRouter({
  routes,
  mode: 'history',
})


export default router
