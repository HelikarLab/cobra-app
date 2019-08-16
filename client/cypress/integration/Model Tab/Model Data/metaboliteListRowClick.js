describe('Metabolite List Click Test', function() {
  it('Clicks on first metabolite and displays its metadata', function() {
    cy.visit('http://localhost:3000/Model')
    //cy.pause()
    //A MODEL SHOULD ALREADY BE PRESENT
    //FOLLOWING 2 LINES OF CODE IMPORTS A MODEL FROM DB
    cy.contains('Saved Model').click()
    //SHOULD DISPLAY LIST OF SAVED MODELS
    cy.get('button').contains('Model Name').click()
    cy.get('span').contains('×').click()
    cy.contains('Compartments')
    cy.contains('Metabolites')
    //SHOULD DISPLAY CONFIRMATION MODAL
    cy.get('tbody#metabolite-list').get('tr#metabolite-row').next().first().click('center')
    cy.contains('Metabolite ID')
    cy.contains('Metabolite Name')
    cy.contains('Formula')
    //CLOSE THE MODAL
    //cy.get('span').contains('×').click()
  })
})
