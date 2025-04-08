describe('Product Create', () => {
  beforeEach(() => {
    cy.visit('/create-product')
  })

  it('should display the product creation form', () => {
    cy.get('h1').should('contain', 'Create Product')

    // Check if all form fields are present
    cy.get('#name').should('exist')
    cy.get('#productTagline').should('exist')
    cy.get('#shortDescription').should('exist')
    cy.get('#longDescription').should('exist')
    cy.get('#productUrl').should('exist')
    cy.get('#voucherTypeName').should('exist')
    cy.get('#orderUrl').should('exist')
    cy.get('#productTitle').should('exist')
  })

  it('should show validation errors for required fields when submitting empty form', () => {
    // Clear all fields first (they might have sample data)
    cy.get('#name').clear()
    cy.get('#productTagline').clear()
    cy.get('#shortDescription').clear()
    cy.get('#longDescription').clear()
    cy.get('#productUrl').clear()
    cy.get('#voucherTypeName').clear()
    cy.get('#orderUrl').clear()
    cy.get('#productTitle').clear()

    // Submit form
    cy.get('[data-testid="create-product-button"]').click()

    // Check for error message
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Please fill in all required fields')
    })
  })

  it('should successfully create a product with valid data', () => {
    const testProduct = {
      name: 'Test Product',
      productTagline: 'Test Tagline',
      shortDescription: 'Test Short Description',
      longDescription: 'Test Long Description',
      logoLocation: 'https://example.com/logo.png',
      productUrl: 'https://example.com/product',
      voucherTypeName: 'TEST_VOUCHER',
      orderUrl: 'https://example.com/order',
      productTitle: 'Test Product Title',
      variableDenomPriceMinAmount: '10',
      variableDenomPriceMaxAmount: '100',
    }

    // Fill in the form
    cy.get('#name').clear().type(testProduct.name)
    cy.get('#productTagline').clear().type(testProduct.productTagline)
    cy.get('#shortDescription').clear().type(testProduct.shortDescription)
    cy.get('#longDescription').clear().type(testProduct.longDescription)
    cy.get('#logoLocation').clear().type(testProduct.logoLocation)
    cy.get('#productUrl').clear().type(testProduct.productUrl)
    cy.get('#voucherTypeName').clear().type(testProduct.voucherTypeName)
    cy.get('#orderUrl').clear().type(testProduct.orderUrl)
    cy.get('#productTitle').clear().type(testProduct.productTitle)
    cy.get('#variableDenomPriceMinAmount').clear().type(testProduct.variableDenomPriceMinAmount)
    cy.get('#variableDenomPriceMaxAmount').clear().type(testProduct.variableDenomPriceMaxAmount)

    // Submit form
    cy.get('[data-testid="create-product-button"]').click()

    // Check for success message
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Product created successfully')
    })

    // Should redirect to products page
    cy.url().should('include', '/')

    cy.get('[data-testid="product-item-7"]').should('exist')
    cy.get('[data-testid="product-item-7"]').contains(testProduct.name)
  })

  it('should cancel creation and return to products page', () => {
    cy.get('[data-testid="cancel-button"]').click()
    cy.url().should('include', '/')
  })
})
