import { BasePage } from "./basePage";

export class PaymentOptionsPage extends BasePage {
    static get cardSelection(){
        return cy.get("#mat-radio-54-input");
    }

    static get continueBtn(){
        return cy.get("button[aria-label='Proceed to review']");
    }
}
