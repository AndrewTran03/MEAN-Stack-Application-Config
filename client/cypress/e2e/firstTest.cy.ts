const CYPRESS_TEST_URL = (Cypress.env("TESTING_WEB_URL") as string) || "http://localhost:4200";

describe("first-test", () => {
  beforeEach("setup", () => {
    // cy.visit("https://example.cypress.io");
    cy.visit(CYPRESS_TEST_URL);
  });

  it("check first screen", () => {
    cy.get("h1").contains("Project-Frontend");
    // how do you get reference to an Angular component here to check if values were updated?
    cy.get('[data-cy-testid="inc-btn"]').should("contain", "Increment");
  });
});
