describe('Compartment List Click Test', function() {
  it('Clicks on first compartment and displays new graph', function() {
    cy.visit('http://localhost:3000/Model')
    //cy.pause()
    //A MODEL SHOULD ALREADY BE PRESENT
    //FOLLOWING 2 LINES OF CODE IMPORTS A MODEL FROM DB
    cy.contains('Saved Model').click()
    //SHOULD DISPLAY LIST OF SAVED MODELS
    cy.get('button').contains('Model Name').click()
    cy.get('span').contains('×').click()
    cy.contains('Compartments')
    cy.contains('Graph')
    //SHOULD DISPLAY CONFIRMATION MODAL
    cy.get('button').contains('Compartments').click()
    cy.get('button#compartment-item.dropdown-item').first().click()
    //CLOSE THE MODAL
    //cy.get('span').contains('×').click()
  })
})
