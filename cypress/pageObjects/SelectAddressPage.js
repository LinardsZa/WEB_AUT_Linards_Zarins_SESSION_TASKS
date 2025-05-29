import { BasePage } from "./basePage";

export class SelectAddressPage extends BasePage {
  static selectAddress(address) {
    cy.contains("mat-row", address) // Find the row containing the address
        .find('mat-radio-button') // Find the radio button in that row
        .click(); // Click the radio button
  }




  static get continueBtn() {
    return cy.get("button[aria-label='Proceed to payment selection']");
  }
}
