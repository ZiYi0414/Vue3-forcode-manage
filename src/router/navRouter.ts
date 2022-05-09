import HomeView from '../views/HomeView.vue'

const navRouter = [
  {
    path: '/',
    name: '主页',
    component: HomeView,
    meta: {
      requireAuth: true
    }
  },

  {
    path: '/user',
    name: '用户管理',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/UserView.vue'),
    meta: {
      requireAuth: true
    }
  },

  {
    path: '/share',
    name: '分享管理',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/ShareView.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/Comment',
    name: '评论管理',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/CommentView.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/board',
    name: '排行榜管理',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/BoardView.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/about',
    name: '关于',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      requireAuth: true
    }
  }
]

export default navRouter
