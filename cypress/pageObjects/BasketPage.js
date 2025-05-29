import { BasePage } from "./basePage";

export class BasketPage extends BasePage {
  static get checkoutBtn() {
    return cy.get("button#checkoutButton");
  }
}
