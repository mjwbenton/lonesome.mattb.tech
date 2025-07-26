beforeEach(() => {
  const authHeader = Cypress.env("TEST_AUTH_SECRET");
  cy.intercept("*", (req) => {
    req.headers["x-lonesome-test-auth"] = authHeader;
  });
});

Cypress.Commands.overwrite("visit", (originalFn, url, options = {}) => {
  const authHeader = Cypress.env("TEST_AUTH_SECRET");

  return originalFn(url, {
    ...options,
    headers: {
      ...options.headers,
      "x-lonesome-test-auth": authHeader,
    },
  });
});
