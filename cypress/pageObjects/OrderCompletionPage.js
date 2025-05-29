import { BasePage } from "./basePage";

export class OrderCompletionPage extends BasePage {
  static get purchesInfo() {
    return cy.get("h1.confirmation");
  }
}
