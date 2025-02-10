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
  test("register with valid data", async ({ page }) => {
    const heading = page.locator("h1");
    // await heading.waitFor();
    await registerPage.heading.waitFor();
    await expect(registerPage.heading).toHaveText(HEADINGS["REGISTER"]);

    await registerPage.register(username, email, password);

    await expect(page).toHaveURL(URLS["DASHBOARD"]);

    await page.waitForURL(URLS["DASHBOARD"]);
  });
  test("register with valid data", async ({ page }) => {
    await registerPage.heading.waitFor();
    await expect(registerPage.heading).toHaveText(HEADINGS["REGISTER"]);
    //turn on event listener
    await registerPage.register(username, email, password);
    const response = await page.waitForResponse(/register*/);
    const responseJSON = await response.json();
    console.log(responseJSON);
    await page.waitForURL(URLS["DASHBOARD"]);
    await expect(page).toHaveURL(URLS["DASHBOARD"]);
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
