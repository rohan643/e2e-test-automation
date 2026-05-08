# ✅ E2E Test Automation

Cypress test suite. Zero-flake. CI/CD integrated. Replaced manual QA entirely.

![Cypress](https://img.shields.io/badge/Cypress-13.x-04C38E?logo=cypress&logoColor=white&style=flat-square)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI-2088FF?logo=githubactions&logoColor=white&style=flat-square)
![Coverage](https://img.shields.io/badge/Coverage-187_tests-brightgreen?style=flat-square)
![Flake_Rate](https://img.shields.io/badge/Flake_Rate-%3C0.5%25-brightgreen?style=flat-square)

---

### Coverage

```
auth/          login · password reset · session expiry · MFA
dashboard/     data load · filters · date picker · CSV export
forms/         validation · file upload · dependent dropdowns
admin/         user management · RBAC · bulk operations
api/           timeout handling · retry logic · error states
```

### Running Tests

```bash
npm install
npx cypress run                    # headless
npx cypress open                   # interactive
npx cypress run --spec "cypress/e2e/auth/**"   # specific suite
```

### CI

Tests run on every PR. Failing test = blocked merge.

```yaml
# .github/workflows/cypress.yml
on: [push, pull_request]
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: cypress-io/github-action@v6
        with:
          start: npm start
          wait-on: 'http://localhost:3000'
```

### Zero-Flake Rules

- Always intercept network calls — never `cy.wait(3000)`
- Each test seeds its own state, cleans up after
- Assertions use `.should()` chains (retryable), never one-shot checks

---

<sub>[@rohan643](https://github.com/rohan643)</sub>
