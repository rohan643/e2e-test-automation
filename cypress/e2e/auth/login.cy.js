describe('Authentication — Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('logs in with valid credentials', () => {
    cy.intercept('POST', '/api/auth/login').as('loginReq')
    cy.get('[data-cy="email"]').type('admin@test.com')
    cy.get('[data-cy="password"]').type('TestPass123!')
    cy.get('[data-cy="submit"]').click()
    cy.wait('@loginReq').its('response.statusCode').should('eq', 200)
    cy.url().should('include', '/dashboard')
  })

  it('shows error on invalid credentials', () => {
    cy.get('[data-cy="email"]').type('wrong@test.com')
    cy.get('[data-cy="password"]').type('wrongpassword')
    cy.get('[data-cy="submit"]').click()
    cy.expectToast('Invalid email or password', 'error')
    cy.url().should('include', '/login')
  })

  it('redirects to login when session expires', () => {
    cy.loginAs('admin')
    cy.visit('/dashboard')
    cy.clearLocalStorage()
    cy.reload()
    cy.url().should('include', '/login')
  })

  it('locks account after 5 failed attempts', () => {
    for (let i = 0; i < 5; i++) {
      cy.get('[data-cy="email"]').clear().type('admin@test.com')
      cy.get('[data-cy="password"]').clear().type('wrongpass')
      cy.get('[data-cy="submit"]').click()
    }
    cy.expectToast('Account locked', 'error')
  })
})
