describe('Gene List Click Test', function() {
  it('Clicks on first gene and displays its metadata', function() {
    cy.visit('http://localhost:3000/Model')
    //cy.pause()
    //A MODEL SHOULD ALREADY BE PRESENT
    //FOLLOWING 2 LINES OF CODE IMPORTS A MODEL FROM DB
    cy.contains('Saved Model').click()
    //SHOULD DISPLAY LIST OF SAVED MODELS
    cy.get('button').contains('Model Name').click()
    cy.get('span').contains('×').click()
    cy.contains('Compartments')
    cy.contains('Genes')
    //SHOULD DISPLAY CONFIRMATION MODAL
    cy.get('tbody#gene-list').get('tr#gene-row').next().first().click('center')
    cy.contains('Gene ID')
    cy.contains('Gene Name')
    cy.contains('Functional')
    //CLOSE THE MODAL
    //cy.get('span').contains('×').click()
  })
})
