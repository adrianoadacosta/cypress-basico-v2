Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Adriano')
    cy.get('#lastName').type('Costa')
    cy.get('#email').type('adriano@teste.com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click() 
})
