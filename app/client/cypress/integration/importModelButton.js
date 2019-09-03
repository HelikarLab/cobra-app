describe('Import Model Button Test', function() {
  it('Clicks on Import Model and clicks to choose file"', function() {
    cy.visit('http://localhost:3000/Model')

    //Checks Navbar Contents
    cy.contains('FBA App')
    cy.contains('Saved Models')
    cy.contains('Import Model').click()
    cy.get('input').click('left')
    //cy.pause()
    cy.contains('file').click('left')
    //cy.pause()
    cy.contains('Submit').click()
    //CLOSE THE MODAL
    cy.get('span').contains('×').click()
  })
})
