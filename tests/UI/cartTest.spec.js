import { test, expect } from "@playwright/test";
import { DashboardCart } from "../../POM/modules/UI/dashboard";
import { URLS, VALID_LOGIN_PAYLOAD } from "../../fixtures";
import { LoginPage } from "../../POM/modules/UI/loginPage";

test.describe("Test cart functionality, add and remove product", ()=>{
    let loginPage;
    let cartOnPage;
    

    test.beforeEach("log user in", async ({ page }) => {
        loginPage = new LoginPage(page);
        cartOnPage = new DashboardCart(page);
        await page.goto(URLS["LOGIN"]);    
        loginPage.login(VALID_LOGIN_PAYLOAD["EMAIL"],VALID_LOGIN_PAYLOAD["PASSWORD"]);
    });

    test("Add product to cart", async() => {
        await expect(cart.addProductCartButton.toBeVisible());
        await expect(cart.addProductCartButton.toBeEnabled());
        cart.addProductCartButton.click();

        await expect(cart.productAddedNotification).toBeVisible();

    });

    test("Remove product from cart", async() => {
        await expect (cartOnPage.cart.pageCartButton.toBeVisible());
        cart.pageCartButton.click();
        await expect (cartOnPage.cart.removeFromCartButton.toBeVisible());
        cart.removeFromCartButton.click();
    });
});