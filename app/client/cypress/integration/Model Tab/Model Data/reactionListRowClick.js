describe('Reaction List Click Test', function() {
  it('Clicks on first reaction and displays its metadata', function() {
    cy.visit('http://localhost:3000/Model')
    //cy.pause()
    //A MODEL SHOULD ALREADY BE PRESENT
    //FOLLOWING 2 LINES OF CODE IMPORTS A MODEL FROM DB
    cy.contains('Saved Model').click()
    //SHOULD DISPLAY LIST OF SAVED MODELS
    cy.get('button').contains('Model Name').click()
    cy.get('span').contains('×').click()
    cy.contains('Compartments')
    cy.contains('Reactions')
    //SHOULD DISPLAY CONFIRMATION MODAL
    cy.get('tbody#reaction-list').get('tr#reaction-row').next().first().click('center')
    cy.contains('Reaction ID')
    cy.contains('Reaction ')
    cy.contains('Reversible')
    cy.contains('Lower Bound')
    cy.contains('Upper Bound')
    //CLOSE THE MODAL
    //cy.get('span').contains('×').click()
  })
})
