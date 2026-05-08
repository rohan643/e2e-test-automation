// Login via API — fast, no UI overhead
Cypress.Commands.add('loginAs', (role) => {
  const user = Cypress.env('users')[role]
  cy.request('POST', '/api/auth/login', user).then(({ body }) => {
    window.localStorage.setItem('auth_token', body.token)
    window.localStorage.setItem('user_role', body.role)
  })
})

// Assert toast notification
Cypress.Commands.add('expectToast', (message, type = 'success') => {
  cy.get(`[data-testid="toast-${type}"]`, { timeout: 5000 })
    .should('be.visible')
    .and('contain.text', message)
})

// Fill form by field map
Cypress.Commands.add('fillForm', (fieldMap) => {
  Object.entries(fieldMap).forEach(([field, value]) => {
    cy.get(`[data-cy="${field}"]`).clear().type(value)
  })
})

// Wait for network idle
Cypress.Commands.add('waitForIdle', () => {
  cy.intercept('**').as('anyRequest')
  cy.wait('@anyRequest', { timeout: 100 }).then(() => {})
})
