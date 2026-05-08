<div align="center">

# ✅ E2E Test Automation

**Cypress-powered end-to-end test suite that replaced manual QA — saving $5,000+ for a $17M consulting firm.**

[![Cypress](https://img.shields.io/badge/Cypress-E2E-04C38E?style=for-the-badge&logo=cypress&logoColor=white)](https://cypress.io)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/features/actions)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://javascript.info)
[![Savings](https://img.shields.io/badge/Saved-$5%2C000%2B-brightgreen?style=for-the-badge)]()

</div>

---

## Background

A $17M consulting firm was spending significant budget on manual QA cycles before each release. Testers manually walked through critical user flows — login, form submissions, dashboards, data exports — every sprint. The process was slow, inconsistent, and expensive.

This Cypress suite automated the full regression test suite, integrated it into CI/CD, and eliminated the manual QA bottleneck entirely.

**Result: $5,000+ in QA cost savings, faster release cycles, and zero regression surprises.**

---

## What's Covered

### Critical User Flows (Full E2E)
```
Authentication
├── Login (valid credentials, invalid, locked account)
├── Password reset flow
├── Session expiry + redirect
└── MFA verification

Dashboard
├── Data loads correctly on mount
├── Filters update charts in real time
├── Date range picker behavior
├── Export to CSV / PDF
└── Empty state handling

Forms & Data Entry
├── Required field validation
├── Character limits
├── Dropdown dependencies (field B changes based on field A)
├── File upload + preview
└── Submit → confirmation → redirect

Admin Flows
├── User creation and permission assignment
├── Role-based access (non-admin cannot see admin routes)
└── Bulk operations (select all → delete, export)

API Integration Points
├── External data fetch renders correctly
├── API timeout → graceful error state
└── Retry logic on 5xx responses
```

---

## Architecture

```
cypress/
├── e2e/
│   ├── auth/
│   │   ├── login.cy.js
│   │   ├── password-reset.cy.js
│   │   └── session.cy.js
│   ├── dashboard/
│   │   ├── data-loading.cy.js
│   │   ├── filters.cy.js
│   │   └── exports.cy.js
│   ├── forms/
│   │   ├── validation.cy.js
│   │   └── submission.cy.js
│   └── admin/
│       ├── user-management.cy.js
│       └── permissions.cy.js
├── fixtures/
│   ├── users.json           # Test user data
│   ├── mock-api-responses/  # Stubbed API responses
│   └── test-files/          # Files for upload tests
├── support/
│   ├── commands.js          # Custom cy. commands
│   ├── helpers.js           # Reusable test utilities
│   └── e2e.js               # Global hooks
└── cypress.config.js
```

---

## Zero-Flake Design Principles

Flaky tests are worse than no tests — they create noise and erode trust. This suite is built to be deterministic:

```javascript
// ❌ Flaky — race condition on dynamic content
cy.get('.dashboard-chart').should('be.visible')

// ✅ Reliable — wait for the actual data signal
cy.intercept('GET', '/api/dashboard/metrics').as('metricsLoad')
cy.wait('@metricsLoad').its('response.statusCode').should('eq', 200)
cy.get('.dashboard-chart').should('be.visible')
```

Key practices:
- **Network intercepts** on all async data — never `cy.wait(3000)`
- **Data isolation** — each test seeds its own state, cleans up after
- **Custom commands** for repeated patterns (login, navigate to section, etc.)
- **Retry-ability built in** — assertions use `.should()` chains, not one-shot checks
- **Viewport-aware** — tests run at both desktop and tablet breakpoints

---

## CI/CD Integration

```yaml
# .github/workflows/cypress.yml
name: E2E Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: cypress-io/github-action@v6
        with:
          build: npm run build
          start: npm start
          wait-on: 'http://localhost:3000'
          record: true
        env:
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
          CYPRESS_BASE_URL: ${{ secrets.CYPRESS_BASE_URL }}
```

Tests run on every PR. A failing test blocks the merge. No more "we'll catch it in QA."

---

## Test Coverage

```
Total test files:     24
Total test cases:     187
Critical flows:       100% covered
Edge cases:           73 covered
Avg run time:         4m 12s (parallelized across 4 runners)
Flake rate:           < 0.5%
```

---

## Custom Commands (Highlights)

```javascript
// Login without UI (fast, API-based)
Cypress.Commands.add('loginAs', (role) => {
  cy.request('POST', '/api/auth/login', Cypress.env('users')[role])
    .then(({ body }) => {
      window.localStorage.setItem('auth_token', body.token)
    })
})

// Assert toast notification
Cypress.Commands.add('expectToast', (message, type = 'success') => {
  cy.get(`[data-testid="toast-${type}"]`)
    .should('be.visible')
    .and('contain.text', message)
})

// Fill form by field map (clean, readable tests)
Cypress.Commands.add('fillForm', (fieldMap) => {
  Object.entries(fieldMap).forEach(([field, value]) => {
    cy.get(`[data-cy="${field}"]`).clear().type(value)
  })
})
```

---

<div align="center">

**Built by [Rohan Mukherjee](https://github.com/rohan643)**

*Delivered for a $17M consulting firm — $5,000+ in QA savings*

</div>
