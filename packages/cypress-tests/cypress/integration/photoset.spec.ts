const PHOTO_PAGE = "/photos/lockdown";

describe("Photoset", () => {
  it("Loads one image initially", () => {
    cy.visit(PHOTO_PAGE);
    cy.get("img").should("have.length", 1);
  });

  it("Loads more images on scroll", () => {
    cy.visit(PHOTO_PAGE);
    cy.get(".lazyload-wrapper:first").scrollIntoView();
    cy.get("img").should("have.length.gte", 3);
  });
});
