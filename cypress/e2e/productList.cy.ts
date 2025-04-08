describe('Product List Page', () => {
  beforeEach(() => {
    // Visit the product list page before each test
    cy.visit('/')
  })

  it('should display the product list', () => {
    // Check if the product list is displayed
    cy.get('[data-testid="product-list"]').should('exist')
    cy.get('[data-testid="product-item-1679"]').should('be.visible')
  })

  it('should filter the products when we search', () => {
    // Type in the search input and check if the product list is filtered
    cy.get('[data-testid="search-input"]').type('Lords Mobile')
    // wait for 300ms for handling debounce
    cy.wait(300)
    cy.get('[data-testid="product-item-1308"]').should('be.visible')
    cy.get('[data-testid="product-item-1680"]').should('not.exist')
    cy.get('[data-testid="product-item-1681"]').should('not.exist')
  })

  it('should display the proper information in the product card', () => {
    //product-item-1679
    cy.get('[data-testid="product-item-1679"]').should('exist')
    cy.get('[data-testid="product-item-1679-name"]').should('contain', 'Game of Sultans ')
    cy.get('[data-testid="product-item-1679-title"]').should(
      'have.text',
      'Game of Sultans  (Canada) - Codashop',
    )
  })

  it('should delete a product successfully', () => {
    // Visit edit page of product 1679
    cy.visit('/')

    // Click delete button and handle confirmation
    cy.get('[data-testid="delete-product-button-1679"]').click()
    cy.on('window:confirm', () => true)

    // Verify redirect to products page
    cy.url().should('include', '/')

    // Verify product is deleted
    cy.get('[data-testid="product-item-1679"]').should('not.exist')
  })
})
