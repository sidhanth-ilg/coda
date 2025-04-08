describe('Product Edit', () => {
  const existingProductId = 1679

  beforeEach(() => {
    // Visit edit page with query parameters
    cy.visit(`/create-product?edit=true&id=${existingProductId}`)
  })

  it('should load existing product data', () => {
    // Check if form is in edit mode
    cy.get('h1').should('contain', 'Edit Product')

    // Verify fields are pre-populated
    cy.get('#name').should('not.have.value', '')
    cy.get('#productTagline').should('not.have.value', '')
    cy.get('#shortDescription').should('not.have.value', '')
  })

  it('should update product with new data', () => {
    const updatedData = {
      name: 'Updated Product Name',
      productTagline: 'Updated Tagline',
      shortDescription: 'Updated Short Description',
    }

    // Update fields
    cy.get('#name').clear().type(updatedData.name)
    cy.get('#productTagline').clear().type(updatedData.productTagline)
    cy.get('#shortDescription').clear().type(updatedData.shortDescription)

    // Submit form
    cy.get('[data-testid="update-product-button"]').click()

    // Check for success message
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Product updated successfully')
    })

    // Should redirect to products page
    cy.url().should('include', '/')

    // Verify updated data persists
    cy.get(`[data-testid="product-item-${existingProductId}-edit-button"]`).should('exist').click()
    cy.get('#name').should('have.value', updatedData.name)
    cy.get('#productTagline').should('have.value', updatedData.productTagline)
    cy.get('#shortDescription').should('have.value', updatedData.shortDescription)
  })

  it('should validate required fields during edit', () => {
    // Clear required fields
    cy.get('#name').clear()
    cy.get('#productTagline').clear()

    // Try to update
    cy.get('[data-testid="update-product-button"]').click()

    // Check for validation message
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Please fill in all required fields')
    })

    // Should stay on same page
    cy.url().should('include', 'edit=true')
  })

  it('should handle non-existent product gracefully', () => {
    // Visit edit page with non-existent product ID
    cy.visit('/products/create?edit=true&id=999')

    // Should show error message
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Product not found')
    })

    // Should redirect to products page
    cy.url().should('include', '/products')
  })

  it('should cancel edit and return to products page', () => {
    // Make some changes first
    cy.get('#name').clear().type('Changed but not saved')

    // Click cancel button
    cy.get('[data-testid="cancel-button"]').click()

    // Should redirect to products page
    cy.url().should('include', '/')

    // Verify changes were not saved
    cy.visit(`/create-product?edit=true&id=${existingProductId}`)
    cy.get('#name').should('not.have.value', 'Changed but not saved')
  })
})
