import { test, expect } from "@playwright/test";
import {
  HEADINGS,
  URLS,
  generateUserCredentials,
  utils,
} from "../../fixtures/";
import { RegisterPage } from "../../POM/modules/UI/registerPage";


test.describe("register a user", () => {
  let registerPage;
  const { username, email, password } = generateUserCredentials(5);
  test.beforeEach("visit the login page", async ({ page }) => {
    registerPage = new RegisterPage(page);
    await page.goto(URLS["REGISTER"]);
  });

  test("register user without username", async({page}) => {
    const heading = page.locator("h1");
    
    await registerPage.heading.waitFor();
    await expect(registerPage.heading).toHaveText(HEADINGS["REGISTER"]);

    await registerPage.register("", email, password);

    await expect(page).toHaveURL(URLS["DASHBOARD"]);

    await page.waitForURL(URLS["DASHBOARD"]);
  });

  test("register user without email", async({ page }) => {
    const heading = page.locator("h1");
    
    await registerPage.heading.waitFor();
    await expect(registerPage.heading).toHaveText(HEADINGS["REGISTER"]);

    await registerPage.register(username, "", password);

    await expect(page).toHaveURL(URLS["DASHBOARD"]);

    await page.waitForURL(URLS["DASHBOARD"]);
  });

  test("register user without password", async({ page }) => {
    const heading = page.locator("h1");
    
    await registerPage.heading.waitFor();
    await expect(registerPage.heading).toHaveText(HEADINGS["REGISTER"]);

    await registerPage.register(username, email, "");

    await expect(page).toHaveURL(URLS["DASHBOARD"]);

    await page.waitForURL(URLS["DASHBOARD"]);
  });

  test("register user with invalid email format", async({ page }) => {
    const heading = page.locator("h1");
    
    await registerPage.heading.waitFor();
    await expect(registerPage.heading).toHaveText(HEADINGS["REGISTER"]);

    await registerPage.register(username, utils.generateRandomString(5), password);

    await expect(page).toHaveURL(URLS["DASHBOARD"]);

    await page.waitForURL(URLS["DASHBOARD"]);
  });

  test("register with valid data", async ({ page }) => {
    const heading = page.locator("h1");
    
    await registerPage.heading.waitFor();
    await expect(registerPage.heading).toHaveText(HEADINGS["REGISTER"]);

    await registerPage.register(username, email, password);

    await expect(page).toHaveURL(URLS["DASHBOARD"]);

    await page.waitForURL(URLS["DASHBOARD"]);
  });
  

  test("Expect element to be editable", async ({}) => {
    await expect(registerPage.usernameInput).toBeEditable();
    await expect(registerPage.emailInput).toBeEditable();
    await expect(registerPage.passwordInput).toBeEditable();
  });

  test("Expect form to have 3 inputs", async ({}) => {
    const inputLocators = page.locator("form >> input");
    await expect(inputLocators).toHaveCount(3);
  });

  test("Expect element to have class", async ({}) => {
    await expect(registerPage.usernameInput).toHaveClass(
      "w-full rounded p-inputtext p-component"
    );
    await expect(registerPage.emailInput).toHaveClass(
      "w-full rounded p-inputtext p-component"
    );
    await expect(registerPage.passwordInput).toHaveClass(
      "w-full rounded p-inputtext p-component"
    );
  });

  test("Expect element to have ID", async ({}) => {
    await expect(registerPage.usernameInput).toHaveId("username");
    await expect(registerPage.emailInput).toHaveId("email");
    await expect(registerPage.passwordInput).toHaveId("password");
  });

  test("Expect element to have attribute", async ({}) => {
    const usernamePlaceholder = "Username address";
    const emailPlaceholder = "Email address";
    const passwordPlaceholder = "Password";

    await expect(registerPage.usernameInput).toHaveAttribute(
      "placeholder",
      usernamePlaceholder
    );
  });


});
