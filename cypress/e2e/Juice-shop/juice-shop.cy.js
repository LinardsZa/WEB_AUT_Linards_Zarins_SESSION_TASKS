import { HomePage } from "../../pageObjects/HomePage";
import { LoginPage } from "../../pageObjects/LoginPage";
import { RegistrationPage } from "../../pageObjects/registrationPage";
import { BasketPage } from "../../pageObjects/BasketPage";
import { SelectAddressPage } from "../../pageObjects/SelectAddressPage";
import { DeliveryMethodPage } from "../../pageObjects/DeliveryMethodPage";
import { PaymentOptionsPage } from "../../pageObjects/PaymentOptionPage";
import { OrderSummaryPage } from "../../pageObjects/OrderSummaryPage";
import { OrderCompletionPage } from "../../pageObjects/OrderCompletionPage";
import { SavedAddressesPage } from "../../pageObjects/SavedAddressesPage";
import { CreateAddressPage } from "../../pageObjects/CreateAddressPage";
import { SavedPaymentMethodsPage } from "../../pageObjects/SavedPaymentMethodsPage";

describe("Juice-shop scenarious", () => {
    context("Without auto login", () => {
        beforeEach(() => {
            HomePage.visit();
            HomePage.dismissButton.click();
            HomePage.meWantItButton.click();    
        });

        it("Login", () => {
            HomePage.accountButton.click();
            HomePage.loginButton.click();
            LoginPage.emailField.type("demo");
            LoginPage.passwordField.type("demo");
            LoginPage.loginButton.click();
        });

        it("Registration", () => {
            HomePage.accountButton.click();
            HomePage.loginButton.click();
            LoginPage.notYetACustomerLink.click();
            const randomNumber = Math.floor(Math.random() * 900000) + 100000; // Replace with actual random number generation logic
            const emailAddress = `email_${randomNumber}@ebox.com`;
            const password = "ABC123#()"; 
            RegistrationPage.emailField.type(emailAddress); 
            RegistrationPage.passwordField.type(password);
            RegistrationPage.repeatPasswordField.type(password);
            RegistrationPage.securityQuestionField.click();
            RegistrationPage.securityQuestionOptions.contains("Name of your favorite pet?").click();
            RegistrationPage.answerField.type("Fluffy"); 
            RegistrationPage.registrationButton.click();
            LoginPage.emailField.type(emailAddress);
            LoginPage.passwordField.type(password);
            LoginPage.loginButton.click();
            HomePage.accountButton.click();
            HomePage.userProfileButton.should("contain.text", emailAddress);
        });
    });

    
// The auto login function does not work for whatever reason, so im logging in manually 
    context("Auto login not working", () => {
        beforeEach(() => {
            HomePage.visit();
            HomePage.dismissButton.click();
            HomePage.meWantItButton.click(); 
        });

        it("Search and validate Lemon", () => {
            HomePage.accountButton.click();
            HomePage.loginButton.click();
            LoginPage.emailField.type("demo");
            LoginPage.passwordField.type("demo");
            LoginPage.loginButton.click();
            HomePage.searchIcon.click();
            HomePage.searchField.type("Lemon{enter}");
            HomePage.productBox.contains("Lemon Juice (500ml)").click();
            HomePage.productInfo.should("contain.text", "Sour but full of vitamins.");
        });

        it("Search 500ml and validate Lemon, while having multiple cards", () => {
            HomePage.accountButton.click();
            HomePage.loginButton.click();
            LoginPage.emailField.type("demo");
            LoginPage.passwordField.type("demo");
            LoginPage.loginButton.click();
            HomePage.searchIcon.click();
            HomePage.searchField.type("500ml{enter}");
            HomePage.productBox.contains("Lemon Juice (500ml)").click();
            HomePage.productInfo.should("contain.text", "Sour but full of vitamins.");
        });

// Practical scenarious
        // Create scenario - Search 500ml and validate cards
        it("Search 500ml and validate cards", () => {
            HomePage.accountButton.click();
            HomePage.loginButton.click();
            LoginPage.emailField.type("demo");
            LoginPage.passwordField.type("demo");
            LoginPage.loginButton.click();
            // Click on search icon
            HomePage.searchIcon.click();
            // Search for 500ml
            HomePage.searchField.type("500ml{enter}");
            // Select a product card - Eggfruit Juice (500ml)
            HomePage.productBox.contains("Eggfruit Juice (500ml)").click();
            // Validate that the card (should) contains "Now with even more exotic flavour."
            HomePage.productInfo.should("contain.text", "Now with even more exotic flavour.");
            // Close the card
            HomePage.closeButton.click();
            // Select a product card - Lemon Juice (500ml)
            HomePage.productBox.contains("Lemon Juice (500ml)").click();
            // Validate that the card (should) contains "Sour but full of vitamins."
            HomePage.productInfo.should("contain.text", "Sour but full of vitamins.");
            // Close the card
            HomePage.closeButton.click();
            // Select a product card - Strawberry Juice (500ml)
            HomePage.productBox.contains("Strawberry Juice (500ml)").click();
            // Validate that the card (should) contains "Sweet & tasty!"
            HomePage.productInfo.should("contain.text", "Sweet & tasty!");
        });

        // Create scenario - Read a review
        it("Read a review", () => {
            HomePage.accountButton.click();
            HomePage.loginButton.click();
            LoginPage.emailField.type("demo");
            LoginPage.passwordField.type("demo");
            LoginPage.loginButton.click();
            // Click on search icon
            HomePage.searchIcon.click();
            // Search for King
            HomePage.searchField.type("King{enter}");
            // Select a product card - OWASP Juice Shop "King of the Hill" Facemask
            HomePage.productBox.contains("OWASP Juice Shop \"King of the Hill\" Facemask").click();
            // Click expand reviews button/icon (wait for reviews to appear)
            HomePage.reviewButton.click();
            // Validate review - K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!
            HomePage.productInfo.should("contain.text", "K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!");
        });

        // Create scenario - Add a review
        it("Add a review", () => {
            HomePage.accountButton.click();
            HomePage.loginButton.click();
            LoginPage.emailField.type("demo");
            LoginPage.passwordField.type("demo");
            LoginPage.loginButton.click();
            // Click on search icon
            HomePage.searchIcon.click();
            // Search for Raspberry
            HomePage.searchField.type("Raspberry{enter}");
            // Select a product card - Raspberry Juice (1000ml)
            HomePage.productBox.contains("Raspberry Juice (1000ml)").click();
            // Type in review - "Tastes like metal"
            HomePage.reviewTextField.type("Tastes like metal{enter}");
            // Click Submit
            HomePage.submitButton.click({ force: true });
            // Click expand reviews button/icon (wait for reviews to appear)
            HomePage.reviewButton.click();
            // Waits for the review to load
            cy.wait(500);
            // Validate review -  "Tastes like metal"
            HomePage.productInfo.should("contain.text", "Tastes like metal");
            });

        // Create scenario - Validate product card amount
        it("Validate product card amount", () => {
            HomePage.accountButton.click();
            HomePage.loginButton.click();
            LoginPage.emailField.type("demo");
            LoginPage.passwordField.type("demo");
            LoginPage.loginButton.click();
            // Validate that the default amount of cards is 12
            HomePage.productBox.should("have.length", 12);
            // Change items per page (at the bottom of page) to 24
            HomePage.itemsInThePage(24);
            // Validate that the amount of cards is 24
            HomePage.productBox.should("have.length", 24);
            // Change items per page (at the bottom of page) to 36
            HomePage.itemsInThePage(36);
            // Validate that the amount of cards is 35
            HomePage.productBox.should("have.length", 36);// I got 36 cards
        });

        // The radio id may change dynamically for standartDelivery and cardSelection
        // Create scenario - Buy Girlie T-shirt
        it.only("Buy Girlie T-shirt", () => {
            HomePage.accountButton.click();
            HomePage.loginButton.click();
            LoginPage.emailField.type("demo");
            LoginPage.passwordField.type("demo");
            LoginPage.loginButton.click();
            // Click on search icon
            HomePage.searchIcon.click();
            // Search for Girlie
            HomePage.searchField.type("Girlie{enter}");
            // Add to basket "Girlie"
            HomePage.productBox.contains("Girlie").parents("mat-grid-tile").within(() => {
            cy.contains("Add to Basket").click();
            });
            // Click on "Your Basket" button
            HomePage.basketButton.click();
            // Create page object - BasketPage
            // Click on "Checkout" button
            BasketPage.checkoutBtn.click();
            // Create page object - SelectAddressPage
            // Select address containing "United Fakedom"
            SelectAddressPage.selectAddress("United Fakedom");
            // Click Continue button
            SelectAddressPage.continueBtn.click();
            // Create page object - DeliveryMethodPage
            // Select delivery speed Standard Delivery
            DeliveryMethodPage.standardDelivery.click();
            // Click Continue button
            DeliveryMethodPage.continueBtn.click();
            // Create page object - PaymentOptionsPage
            // Select card that ends with "5678"
            PaymentOptionsPage.cardSelection.click();
            // Click Continue button
            PaymentOptionsPage.continueBtn.click();
            // Create page object - OrderSummaryPage
            // Click on "Place your order and pay"
            OrderSummaryPage.orderPayBtn.click();
            // Create page object - OrderCompletionPage
            // Validate confirmation - "Thank you for your purchase!"
            OrderCompletionPage.purchesInfo.should("contain.text", "Thank you for your purchase!");
        });
        
        // Create scenario - Add address
        it("Add address", () => {
            HomePage.accountButton.click();
            HomePage.loginButton.click();
            LoginPage.emailField.type("demo");
            LoginPage.passwordField.type("demo");
            LoginPage.loginButton.click();
            // Click on Account
            HomePage.accountButton.click();
            // Click on Orders & Payment
            HomePage.ordersPaymentsButton.click();
            // Click on My saved addresses
            HomePage.addressButton.click();
            // Create page object - SavedAddressesPage
            SavedAddressesPage.newAddressBtn.click();
            // Fill in the necessary information
            const country = "Nowhere";
            const name = "Jhonny boy";
            const mobile = "20202020";
            const zipCode = "54321";
            const address = "Street idk 321";
            const city = "Missing";
            const state = "Redacted";
            CreateAddressPage.countryField.type(country);
            CreateAddressPage.nameField.type(name);
            CreateAddressPage.mobileField.type(mobile);
            CreateAddressPage.zipCodeField.type(zipCode);
            CreateAddressPage.addressField.type(address);
            CreateAddressPage.cityField.type(city);
            CreateAddressPage.stateField.type(state);
            // Click Submit button
            CreateAddressPage.submitBtn.click();
            // Validate that previously added address is visible
            SavedAddressesPage.addressInfo.should("contain.text", "Street idk 321, Missing, Redacted, 54321");       
        });

        // Create scenario - Add payment option
        it("Add payment option", () => {
            HomePage.accountButton.click();
            HomePage.loginButton.click();
            LoginPage.emailField.type("demo");
            LoginPage.passwordField.type("demo");
            LoginPage.loginButton.click();
            // Click on Account
            HomePage.accountButton.click();
            // Click on Orders & Payment
            HomePage.ordersPaymentsButton.click();
            // Click on My payment options
            HomePage.paymentOptionsButton.click();
            // Create page object - SavedPaymentMethodsPage
            // Click Add new card
            SavedPaymentMethodsPage.addCardButton.click();
            // Fill in Name
            const name = "Adam Warlock";
            SavedPaymentMethodsPage.nameField.type(name);
            // Fill in Card Number
            const cardNumber = "2020 2020 2020 2020";
            SavedPaymentMethodsPage.cardNumberField.type(cardNumber);
            // Set expiry month to 7
            SavedPaymentMethodsPage.expirationMonth.select("7");
            // Set expiry year to 2090
            SavedPaymentMethodsPage.expirationYear.select("2090"); 
            // Click Submit button
            SavedPaymentMethodsPage.submitBtn.click();
            // Validate that the card shows up in the list
            SavedPaymentMethodsPage.cardInfo.should("contain.text", "************2020");
        });
    });
});