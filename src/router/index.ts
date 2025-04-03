import { createRouter, createWebHistory } from 'vue-router'
import ProductsView from '@/views/ProductsView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import CreateProductView from '@/views/CreateProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'products',
      component: ProductsView,
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: ProductDetailView,
    },
    {
      path: '/create-product',
      name: 'create-product',
      component: CreateProductView,
    },
  ],
})

export default router
