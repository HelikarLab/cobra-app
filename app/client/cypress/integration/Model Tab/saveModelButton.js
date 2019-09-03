describe('Save Model Button Test', function() {
  it('Clicks on Save Model and opens the modal', function() {
    cy.visit('http://localhost:3000/Model')
    cy.contains('Save Model')
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
    cy.contains('Save Model').click()
    cy.pause()
    cy.contains('Save your SBML Model')
    cy.contains('Yes')
    cy.contains('Cancel')
    //CLOSE THE MODAL
    //cy.get('span').contains('×').click()
    cy.get('button').contains('Cancel').click()
  })
})
