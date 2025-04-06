<script setup lang="ts">
import ProductsList from '@/components/products/ProductsList.vue'
import useProductsList from '@/components/products/composables/useProductsList'
import { ref, watch } from 'vue'
import CodaButton from '@/components/common/CodaButton.vue'

const { searchTerm } = useProductsList()
const debouncedSearchTerm = ref(searchTerm.value)

const onClearClicked = (): void => {
  debouncedSearchTerm.value = ''
  searchTerm.value = ''
}

let timeout: ReturnType<typeof setTimeout>
watch(debouncedSearchTerm, (newValue) => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    searchTerm.value = newValue
  }, 300)
})
</script>

<template>
  <div class="products-view">
    <div class="products-view__header">
      <div class="products-view__search">
        <input
          v-model="debouncedSearchTerm"
          data-testid="search-input"
          type="text"
          placeholder="Search..."
          class="products-view__input"
        />
        <CodaButton
          class="products-view__clear-button"
          data-testid="clear-button"
          type="danger"
          @click="onClearClicked"
        >
          Clear
        </CodaButton>
      </div>
      <div class="products-view__header-right-buttons">
        <CodaButton
          class="products-view__create-button"
          data-testid="create-product-button"
          type="primary"
          @click="$router.push({ name: 'create-product' })"
        >
          Create Product +
        </CodaButton>
        <CodaButton
          class="products-view__goto-button"
          data-testid="create-product-button"
          type="primary"
          @click="$router.push({ name: 'products-paginated' })"
        >
          Go To Paginated View
        </CodaButton>
      </div>
    </div>
    <ProductsList />
  </div>
</template>
<style scoped>
.products-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.products-view__header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 1rem;
}

.products-view__search {
  display: flex;
  align-items: center;
  width: 60%;
}

.products-view__clear-button {
  margin-left: 1rem;
}

.products-view__goto-button {
  margin-left: 1rem;
}

.products-view__header-right-buttons {
  display: flex;
  align-items: center;
}

.products-view__input {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 50%;
}

@media screen and (max-width: 768px) {
  .products-view {
    padding: 0;
  }
  .products-view__header {
    flex-direction: column;
    align-items: flex-start;
  }

  .products-view__search {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }

  .products-view__clear-button {
    width: 100%;
    margin: 0;
    margin-top: 1rem;
  }
  .products-view__create-button {
    margin-top: 1rem;
    width: 100%;
  }

  .products-view__header-right-buttons {
    flex-direction: column;
    width: 100%;
  }

  .products-view__goto-button {
    margin: 0;
    margin-top: 1rem;
    width: 100%;
  }

  .products-view__input {
    width: 100%;
  }
}
</style>
