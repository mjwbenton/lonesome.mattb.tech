describe("Homepage", () => {
  it("Has the right heading", () => {
    cy.visit("/");
    cy.get("h2").should("have.text", "Lockdown 2020");
  });
});
