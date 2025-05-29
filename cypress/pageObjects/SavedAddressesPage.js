import { BasePage } from "./basePage";

export class SavedAddressesPage extends BasePage {
  static get newAddressBtn() {
    return cy.get("button[aria-label='Add a new address']");
  }

  static get addressInfo() {
    return cy.get("mat-card").contains("Street idk 321");
  }
}
