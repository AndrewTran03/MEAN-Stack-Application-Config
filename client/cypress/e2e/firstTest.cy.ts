/// <reference types="cypress" />

const CYPRESS_TEST_URL = (Cypress.env("TESTING_WEB_URL") as string) || "http://localhost:4200";

describe("first-test", () => {
  beforeEach("setup", () => {
    // cy.visit("https://example.cypress.io");
    // cy.visit("http://localhost:4200");
    cy.visit(CYPRESS_TEST_URL);
  });

  it("check first screen", () => {
    cy.get("h1").contains("Project-Frontend");
    cy.get('[data-cy-testid="inc-btn"]').should("contain", "Increment");
  });
});
