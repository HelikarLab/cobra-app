describe('Import Model Button Test', function() {
  it('Clicks on Saved Model and clicks to choose an existing file', function() {
    cy.visit('http://localhost:3000/Model')

    //Checks Navbar Contents
    cy.contains('FBA App')
    cy.contains('Import Model')
    cy.contains('Saved Model').click()
    //cy.pause()
    //SHOULD DISPLAY LIST OF SAVED MODELS
    cy.get('button').contains('Model Name').click()
    //cy.pause()
    //CLOSE THE MODAL
    cy.get('span').contains('×').click()
    //SHOULD DISPLAY GRAPH AND LIST OF DATA
    cy.contains('Graph')
    cy.contains('Compartments')
    cy.contains('Reactions')
    cy.contains('Metabolites')
    cy.contains('Genes')
  })
})
