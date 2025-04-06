describe('it should display the product details page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate to the product details page', () => {
    cy.window().then((win) => {
      cy.spy(win.navigator.clipboard, 'writeText').as('clipboardSpy')
    })
    const productId = 1679
    const expectedVoucherCode = 'MECHANIST'
    // Click on the product item to navigate to the details page
    cy.get('[data-testid="product-item-1679-view-button"]').should('exist').click()

    cy.get(`[data-testid="product-detail-view-${productId}-order-button"]`).should('exist')

    cy.get(`[data-testid="product-detail-view-${productId}-voucher-code"]`)
      .should('exist')
      .click()
      .then(() => {
        cy.get('@clipboardSpy').should('be.calledWith', expectedVoucherCode)
      })
  })
})
