describe("Homepage", () => {
  it("Has the right heading", () => {
    cy.visit("/");
    cy.get("h1").should("have.text", "Lockdown 2020");
  });
});
