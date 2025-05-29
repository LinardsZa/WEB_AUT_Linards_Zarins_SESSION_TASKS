export class BasePage {
    static get url() {
        return "";
    }

    static visit() {
        cy.visit("https://juice-shop.herokuapp.com/#/");
    }
}