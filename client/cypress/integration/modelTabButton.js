describe('Model Tab Button Test', function() {
  it('Clicks on Model Tab"', function() {
    cy.visit('http://localhost:3000/Model')
    cy.contains('Model').click()

    //Checks Navbar Contents
    cy.contains('FBA App')
    cy.contains('Import Model')
    cy.contains('Saved Models')

    //Checks Model Tab Contents
    cy.contains('Graph')
  })
})
