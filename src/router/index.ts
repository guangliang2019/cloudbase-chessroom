import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Main from '../views/Main.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Home from '../views/Home.vue';
import Message from '../views/Message.vue';
import Game from '../views/Game.vue';
import Gomuku from '../components/games/gomuku/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/message',
        name: 'Message',
        component: Message,
      },
      {
        path: '/game',
        name: 'Game',
        component: Game,
        children: [
          {
            path: '/game/gomuku',
            name: 'Gomuku',
            component: Gomuku,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/*',
    components: Login,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
