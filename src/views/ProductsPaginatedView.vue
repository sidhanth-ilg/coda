<script setup lang="ts">
import ProductsList from '@/components/products/ProductsList.vue'
import useProductsList from '@/components/products/composables/useProductsList'
import { ref, watch } from 'vue'

const { searchTerm, currentPage, totalPages, nextPage, previousPage, goToPage } = useProductsList()
const debouncedSearchTerm = ref('')

const onClearClicked = (): void => {
  debouncedSearchTerm.value = ''
  searchTerm.value = ''
  // Reset to first page when search is cleared
  goToPage(1)
}

let timeout: ReturnType<typeof setTimeout>
watch(debouncedSearchTerm, (newValue) => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    searchTerm.value = newValue
    // Reset to first page when search changes
    goToPage(1)
  }, 300)
})
</script>

<template>
  <div class="products-view">
    <div class="products-view__header">
      <div class="products-view__search">
        <input
          data-testid="search-input"
          type="text"
          placeholder="Search..."
          v-model="debouncedSearchTerm"
        />
        <button class="products-view__clear-button" @click="onClearClicked">Clear</button>
      </div>
      <button
        class="products-view__create-button"
        @click="$router.push({ name: 'create-product' })"
      >
        Create Product +
      </button>
    </div>
    <ProductsList />

    <!-- Pagination Controls -->
    <div v-if="totalPages > 1" class="pagination">
      <button class="pagination__button" :disabled="currentPage === 1" @click="previousPage">
        Previous
      </button>
      <div class="pagination__info">Page {{ currentPage }} of {{ totalPages }}</div>
      <button class="pagination__button" :disabled="currentPage === totalPages" @click="nextPage">
        Next
      </button>
    </div>
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
  width: 70%;
}

.products-view__clear-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  height: 2rem;
  margin-left: 1rem;
}

.products-view__create-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  height: 2rem;
}
input {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 50%;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
  gap: 1rem;
}

.pagination__button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.pagination__button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.pagination__info {
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
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
  input {
    width: 100%;
  }

  .pagination {
    flex-direction: row;
    width: 100%;
    padding: 0 1rem;
  }

  .pagination__button {
    flex: 1;
  }
}
</style>
