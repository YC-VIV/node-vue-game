import Vue from 'vue'
import VueRouter from 'vue-router'

const Main = () => import('../views/Main.vue')
const CategoryCreate = () => import('../components/Categories/CategoryCreate.vue')
const CategoryList = () => import('../components/Categories/CategoryList.vue')

const ItemCreate = () => import('../components/Items/ItemCreate.vue')
const ItemList = () => import('../components/Items/ItemList.vue')

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
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes 
})

export default router