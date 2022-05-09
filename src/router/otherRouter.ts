const otherRouter = [
  {
    path: '/login',
    name: '登录',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta: {
      requireAuth: false
    }
  }
]

export default otherRouter
