///<reference types="cypress" />

it('open app and add new task, mark as done',()=>{
    cy.visit('http://localhost:3000/')
    cy.get('.input__box').type('do tests{enter}')
    cy.get('.tasks__single--text').should('have.text','do tests')
});

