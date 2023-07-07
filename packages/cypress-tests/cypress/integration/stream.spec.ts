const STREAM_PAGE = "/photos/stream";
const PHOTO = "[data-testid='photo-content-block']";
const LOAD_MORE = "[data-testid='load-more-button']";

describe("Stream", () => {
  it("Loads 20 images initially", () => {
    cy.visit(STREAM_PAGE);
    cy.get(PHOTO).should("have.length", 20);
  });

  it("Loads more on clicking 'Load more'", () => {
    cy.get(LOAD_MORE).click();
    cy.get(PHOTO).should("have.length", 40);
  });
});
