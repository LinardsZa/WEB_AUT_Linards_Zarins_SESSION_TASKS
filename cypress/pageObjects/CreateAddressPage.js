import { BasePage } from "./basePage";

export class CreateAddressPage extends BasePage {
  static get countryField() {
    return cy.get("input[placeholder='Please provide a country.']");
  }

  static get nameField() {
    return cy.get("input[placeholder='Please provide a name.']");
  }

  static get mobileField() {
    return cy.get("input[placeholder='Please provide a mobile number.']");
  }

  static get zipCodeField() {
    return cy.get("input[placeholder='Please provide a ZIP code.']");
  }

  static get addressField() {
    return cy.get("textarea[placeholder='Please provide an address.']");
  }

  static get cityField() {
    return cy.get("input[placeholder='Please provide a city.']");
  }

  static get stateField() {
    return cy.get("input[placeholder='Please provide a state.']");
  }

  static get submitBtn() {
    return cy.get("button#submitButton");
  }
}
