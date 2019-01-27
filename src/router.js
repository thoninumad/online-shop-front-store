import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/team',
      name: 'team',
      component: () => import( /* webpackChunkName: "categories" */'./views/Team.vue')
    },
    {
      path: '/services',
      name: 'services',
      component: () => import( /* webpackChunkName: "categories" */'./views/Services.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import( /* webpackChunkName: "categories" */'./views/Contact.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import( /* webpackChunkName: "categories" */'./views/Categories.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import( /* webpackChunkName: "products" */'./views/Products.vue')
    },
    {
      path: '/category/:slug',
      name: 'category',
      component: () => import( /* webpackChunkName: "category" */'./views/Category.vue')
    },
    {
      path: '/product/:slug',
      name: 'product',
      component: () => import( /* webpackChunkName: "product" */'./views/Product.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import( /* webpackChunkName: "checkout" */'./views/Checkout.vue'),
      meta : {auth:true}
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import( /* webpackChunkName: "payment" */'./views/Payment.vue'),
      meta : {auth:true}
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import( /* webpackChunkName: "profile" */'./views/Profile.vue'),
      meta : {auth:true}
    },
    {
      path: '/my-order',
      name: 'my-order',
      component: () => import( /* webpackChunkName: "my-order" */'./views/MyOrder.vue'),
      meta : {auth:true}
    },
    {
      path: '*',
      redirect: {
          name: 'home'
      }
    },
  ],
})

router.beforeEach((to, from, next) => {
    // jika routing ada meta auth-nya
    if(to.matched.some(record => record.meta.auth)) {
        // jika user adalah guest
        if(store.getters['auth/guest']) {
            // tampilkan pesan harus login
            store.dispatch('alert/set', {
                status : true,
                text : 'Login first',
                type : 'error',
            })

            // tampilkan form login
            store.dispatch('setPrevUrl', to.path)
            store.dispatch('dialog/setComponent', 'login')
            store.dispatch('dialog/setStatus', true)
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
