const PAGE = "/instant-timer";
const CLOCK = "[data-testid='timer-clock']";
const SET_TIMER = (time: number) => `[data-testid='timer-set-${time}']`;
const START_BUTTON = "[data-testid='timer-start-button']";
const CELEBRATION = "[data-testid='timer-celebration']";

describe("Instant Timers", () => {
  it("Times correctly", () => {
    cy.visit(PAGE);
    cy.get(CLOCK).should("have.text", "00 : 00");
    cy.get(SET_TIMER(15)).last().click();
    cy.get(CLOCK).should("have.text", "00 : 15");
    cy.get(START_BUTTON).click();
    cy.get(CLOCK).should("have.text", "00 : 14");
    cy.get(CLOCK, { timeout: 15000 }).should("have.text", "00 : 00");
    cy.get(CELEBRATION).should("exist");
  });

  it("Handles formatting minutes correctly", () => {
    cy.visit(PAGE);
    cy.get(SET_TIMER(270)).first().click();
    cy.get(CLOCK).should("have.text", "04 : 30");
  });
});
