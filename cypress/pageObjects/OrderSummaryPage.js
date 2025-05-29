import { BasePage } from "./basePage";

export class OrderSummaryPage extends BasePage {
  static get orderPayBtn() {
    return cy.get("button[aria-label='Complete your purchase']");
  }
}
