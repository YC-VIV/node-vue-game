import Vue from 'vue'
import VueRouter from 'vue-router'

const Main = () => import('../views/Main.vue')
const Login = () => import('../views/Login.vue')

const CategoryCreate = () => import('../components/Categories/CategoryCreate.vue')
const CategoryList = () => import('../components/Categories/CategoryList.vue')

const ItemCreate = () => import('../components/Items/ItemCreate.vue')
const ItemList = () => import('../components/Items/ItemList.vue')

const HeroCreate = () => import('../components/Heroes/HeroCreate.vue')
const HeroList = () => import('../components/Heroes/HeroList.vue')

const ArticleCreate = () => import('../components/Articles/ArticleCreate.vue')
const ArticleList = () => import('../components/Articles/ArticleList.vue')

const CarouselCreate = () => import('../components/Carousels/CarouselCreate.vue')
const CarouselList = () => import('../components/Carousels/CarouselList.vue')

const UserCreate = () => import('../components/Users/UserCreate.vue')
const UserList = () => import('../components/Users/UserList.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      // 分类
      { 
        path: '/categories/create', 
        component: CategoryCreate 
      },
      { 
        path: '/categories/list', 
        component: CategoryList 
      },
      {
        path: '/categories/edit/:id',
        component: CategoryCreate,
        props: true
      },
      // 物品
      { 
        path: '/items/create', 
        component: ItemCreate 
      },
      { 
        path: '/items/list', 
        component: ItemList 
      },
      {
        path: '/items/edit/:id',
        component: ItemCreate,
        props: true
      },
      // 英雄
      { 
        path: '/heroes/create', 
        component: HeroCreate 
      },
      { 
        path: '/heroes/list', 
        component: HeroList 
      },
      {
        path: '/heroes/edit/:id',
        component: HeroCreate,
        props: true
      },
      // 文章
      {
        path: '/articles/create',
        component: ArticleCreate,
      },
      {
        path: '/articles/list',
        component: ArticleList,
      },
      {
        path: '/articles/edit/:id',
        component: ArticleCreate,
        props: true
      },
      // 轮播图
      {
        path: '/carousels/create',
        component: CarouselCreate,
      },
      {
        path: '/carousels/list',
        component: CarouselList,
      },
      {
        path: '/carousels/edit/:id',
        component: CarouselCreate,
        props: true
      },
      // 用户
      {
        path: '/users/create',
        component: UserCreate,
      },
      {
        path: '/users/list',
        component: UserList,
      },
      {
        path: '/users/edit/:id',
        component: UserCreate,
        props: true
      },
    ]
  },{
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes 
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') { return next() }
  const token = window.localStorage.getItem('token')
  if (!token) { return next('/login') }
  next()
})

export default router