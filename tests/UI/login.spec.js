import { test, expect } from "@playwright/test";
import { HEADINGS, URLS, utils, VALID_LOGIN_PAYLOAD } from "../../fixtures";
import { LoginPage } from "../../POM/modules/UI/loginPage";
import exp from "constants";

test.describe("register a user and log in", () => {
  let loginPage;

  test.beforeEach("visit the login page", async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto(URLS["LOGIN"]);
  });
  test("log in with registered user", async ({ page }) => {
    await loginPage.heading.waitFor();
    await expect(loginPage.heading).toHaveText(HEADINGS["LOGIN"]);

    loginPage.login(
      VALID_LOGIN_PAYLOAD["EMAIL"],
      VALID_LOGIN_PAYLOAD["PASSWORD"]
    );

    await page.waitForURL(URLS["DASHBOARD"]);
    await expect(page).toHaveURL(URLS["DASHBOARD"]);
  });

  test("Expect element to be editable", async ({}) => {
    await expect(loginPage.emailInput).toBeEditable();
    await expect(loginPage.passwordInput).toBeEditable();
  });

  test("Expect form to have 2 inputs", async ({}) => {
    const inputLocators = page.locator("form >> input");
    await expect(inputLocators).toHaveCount(2);
  });

  test("Expect element to have class", async ({}) => {
    await expect(loginPage.emailInput).toHaveClass(
      "w-full rounded p-inputtext p-component"
    );
    await expect(loginPage.passwordInput).toHaveClass(
      "w-full rounded p-inputtext p-component"
    );
  });

  test("Expect element to have ID", async ({}) => {
    await expect(loginPage.emailInput).toHaveId("email");
    await expect(loginPage.passwordInput).toHaveId("password");
  });

  expect("Expect element to have attribute", async ({}) => {
    const emailPlaceholder = "Email address";
    const passwordPlaceholder = "Password";

    await expect(loginPage.emailInput).toHaveAttribute(
      "placeholder",
      emailPlaceholder
    );
    await expect(loginPage.passwordInput).toHaveAttribute(
      "placeholder",
      passwordPlaceholder
    );
  });

  test("Expect element to retain values when typed into", async ({}) => {
    const emailValue = "filip@test.com";
    const passwordValue = "test123";
    await loginPage.emailInput.fill(emailValue);
    await expect(loginPage.emailInput).toHaveValue(emailValue);

    await login.passwordInput.fill(passwordValue);
    await expect(loginPage.passwordInput).toHaveValue(passwordValue);
  });

  test("Expect element to be enabled", async ({}) => {
    await expect(loginPage.submitButton).toBeEnabled();
  });

  test("Expect element to be focused", async ({}) => {
    await loginPage.emailInput.click();
    await expect(loginPage.emailInput).toBeFocused();
  });

  test("Expect element to be empty", async ({}) => {
    await expect(loginPage.emailInput).toBeEmpty();
  });

  test("Expect form with all elements to be in viewport", async ({ page }) => {
    await expect(page.locator("form")).toBeInViewport();
    await expect(page.locator("form >> input").nth(0)).toBeInViewport();
    await expect(page.locator("form >> input").nth(1)).toBeInViewport();
    await expect(page.locator("form >> input")).toBeInViewport();
  });
});
