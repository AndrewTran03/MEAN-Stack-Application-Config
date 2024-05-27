import { HeaderComponent } from "./header.component";

describe("header.component.cy.ts", () => {
  beforeEach("setup", () => {
    cy.mount(HeaderComponent);
  });

  it("playground", () => {
    cy.get("h1").contains("Project-Frontend");
    cy.get('[data-cy-testid="inc-btn"]').should("contain", "Increment");
  });
});
