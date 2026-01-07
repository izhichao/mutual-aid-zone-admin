import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ './views/LoginView.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ './views/HomeView.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import(/* webpackChunkName: "index" */ './views/IndexView.vue')
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */ './views/UserView.vue')
      },
      {
        path: 'task',
        name: 'Task',
        component: () => import(/* webpackChunkName: "task" */ './views/TaskView.vue')
      },
      {
        path: 'store',
        name: 'Store',
        component: () => import(/* webpackChunkName: "store" */ './views/StoreView.vue')
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import(/* webpackChunkName: "store" */ './views/OrderView.vue')
      },
      {
        path: 'ticket',
        name: 'Ticket',
        component: () => import(/* webpackChunkName: "store" */ './views/TicketView.vue')
      },
      {
        path: 'chat',
        name: 'Chat',
        component: () => import(/* webpackChunkName: "store" */ './views/ChatView.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory('/admin/'),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  // 当没有token时，且访问的页面不是登录注册页时，跳转到登录页
  if (!token && to.name !== 'Login') {
    next({ name: 'Login' });
  } else if (token && to.name === 'Login') {
    next({ name: 'Index' });
  } else {
    next();
  }
});

export default router;
