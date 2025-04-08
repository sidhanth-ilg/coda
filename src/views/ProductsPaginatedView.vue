<script setup lang="ts">
import CodaButton from '@/components/common/CodaButton.vue'
import ProductsListPaginated from '@/components/products/ProductsListPaginated.vue'
import useProductsPaginatedList from '@/components/products/composables/useProductsPaginatedList.ts'
import { ref, watch } from 'vue'

const { searchTerm, currentPage, totalPages, nextPage, previousPage, goToPage } =
  useProductsPaginatedList()
const debouncedSearchTerm = ref(searchTerm.value)

const reset = (): void => {
  debouncedSearchTerm.value = ''
  searchTerm.value = ''
  // Reset to first page when search is cleared
  goToPage(1)
}

let timeout: ReturnType<typeof setTimeout>
watch(debouncedSearchTerm, (newValue: string) => {
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
          :disabled="debouncedSearchTerm === ''"
          @click="reset"
        >
          Clear
        </CodaButton>
      </div>
      <div class="products-view__header-right-buttons">
        <CodaButton
          class="products-view__create-button"
          data-testid="create-product-button"
          type="primary"
          @click="$router.push({ name: 'create-product', query: { fromPaginated: 'true' } })"
        >
          Create Product +
        </CodaButton>
        <CodaButton
          class="products-view__goto-button"
          data-testid="create-product-button"
          type="primary"
          @click="$router.push({ name: 'products' })"
        >
          Go To Scroll View
        </CodaButton>
      </div>
    </div>
    <ProductsListPaginated @delete="reset" />

    <!-- Pagination Controls -->
    <div v-if="totalPages > 1" class="products-page-paginated-view__pagination-buttons">
      <CodaButton
        class="products-page-paginated-view__paginate-button"
        :disabled="currentPage === 1"
        @click="previousPage"
      >
        Previous
      </CodaButton>

      <div class="products-page-paginated-view__pagination-info">
        {{ currentPage }} of {{ totalPages }}
      </div>
      <CodaButton
        class="products-page-paginated-view__paginate-button"
        :disabled="currentPage === totalPages"
        label="Next"
        @click="nextPage"
      >
        Next
      </CodaButton>
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
  width: 50%;
}

.products-view__goto-button {
  margin-left: 1rem;
}

.products-view__header-right-buttons {
  display: flex;
  align-items: center;
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

.products-view__input {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 50%;
}

.products-page-paginated-view__pagination-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
  gap: 1rem;
}

.products-page-paginated-view__paginate-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.products-page-paginated-view__pagination-info {
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

  .products-view__input {
    width: 100%;
  }

  .products-page-paginated-view__pagination-buttons {
    flex-direction: row;
    width: 100%;
    padding: 0 1rem;
  }

  .products-page-paginated-view__paginate-button {
    flex: 1;
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

  .products-page-paginated-view__pagination-info {
    font-size: 0.875rem;
    font-weight: light;
    padding: 0;
  }
}
</style>
