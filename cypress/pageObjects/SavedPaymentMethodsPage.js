import { BasePage } from "./basePage";

export class SavedPaymentMethodsPage extends BasePage {
    static get addCardButton() {
        return cy.contains('mat-expansion-panel-header', 'Add new card')
    }

  static get nameField() {
    return cy.get("#mat-input-4");
  }

  static get cardNumberField() {
    return cy.get("#mat-input-5");
  }

  static get expirationMonth() {
    return cy.get("#mat-input-6");
  }

  static get expirationYear() {
    return cy.get("#mat-input-7");
  }

  static get submitBtn() {
    return cy.get("button#submitButton");
  }

  static get cardInfo(){
    return cy.get('mat-cell.mat-column-Number')
  }
}
