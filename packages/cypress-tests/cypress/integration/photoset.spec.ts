const PHOTO_PAGE = "/photos/lockdown";

describe("Photoset", () => {
  it("Loads two images initially", () => {
    cy.visit(PHOTO_PAGE);
    cy.get("img").should("have.length", 2);
  });

  it("Loads more images on scroll", () => {
    cy.visit(PHOTO_PAGE);
    cy.get(".lazyload-wrapper:first").scrollIntoView();
    cy.get("img").should("have.length.gte", 3);
  });
});
