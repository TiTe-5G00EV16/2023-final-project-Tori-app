describe('Listings page', () => {
  it('should show heading', () => {
    cy.visit('/')
    cy.get('h1').should('contain', 'Tori')
  })
  it('should open the Login view when clicking Login', () => {
    cy.visit('/')
    cy.contains('Login').click()
    cy.url().should('include', 'auth')
    cy.contains('SignUp instead?').click()
    cy.get('button').should('not.contain', 'SignUp instead?')
    cy.contains('Login instead?').click()
    cy.get('button').should('not.contain', 'Login instead?')
  })
  it('should login a user with valid credentials', () => {
    cy.visit('/auth')
    cy.get('#email').type('tony@stark.com')
    cy.get('#password').type('tony@1234')
    cy.get('form > button').click()
    cy.url().should('be.equal',`${Cypress.config("baseUrl")}/`)
  })
  it('should show error message when signinup with too sort password', () => {
    cy.visit('/auth')
    cy.contains('SignUp instead?').click()
    cy.get('#name').type('Ilkka')
    cy.get('#email').type('tony@stark.com')
    cy.get('#password').type('1234')
    cy.get('form > button').click()
    cy.get('[data-cy=errorMsg]').should('contain', 'Password must be atleast 8 characters long')
  })
})

describe('The add listing page', () => {
  it('should only be for logged in users', () => {
    cy.login('tony@stark.com', 'tony@1234')
    cy.url().should('be.equal',`${Cypress.config("baseUrl")}/`)
    cy.contains('Create listing').click()
    cy.get('#name').type('Nike Shoes')
    cy.get('#price').type('20')
    cy.get('#description').type('Shiny Nike shoes size 43')
    cy.get('.listing-form > button').click()
    cy.visit('/')
    cy.contains('Nike Shoes')
  })
})

describe('UsersListings page', () => {
  it('should see own listing in userlisting page', () =>{
    cy.login('tony@stark.com', 'tony@1234')
    cy.url().should('be.equal',`${Cypress.config("baseUrl")}/`)
    cy.contains('Create listing').click()
    cy.get('#name').type('Silver Spoon')
    cy.get('#price').type('50')
    cy.get('#description').type('Shiny silverspoon')
    cy.get('.listing-form > button').click()
    cy.visit('/listings/userlistings')
    cy.contains('Silver Spoon')
    cy.contains('Shiny silverspoon')
  })
})