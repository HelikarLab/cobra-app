describe('Simulation Tab Button Test', function() {
  it('Clicks on Simulation Tab"', function() {
    cy.visit('http://localhost:3000/Model')
    cy.contains('Simulation').click()

    //Checks Navbar Contents
    cy.contains('FBA App')
    cy.contains('Import Model')
    cy.contains('Saved Models')

    //Checks Simulation Tab Contents
    cy.contains('Flux Balance Analysis')
    cy.contains('Flux Variability Analysis')
    cy.contains('Essentiality')
    cy.contains('Synthetic Lethality')
  })
})
