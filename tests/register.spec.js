import { test, expect } from "@playwright/test";
import { HEADINGS, URLS, generateUserCredentials, utils } from "../fixtures";
import { RegisterPage } from "./POM/registerPage";

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

    registerPage.register(username, email, password);

    await expect(page).toHaveURL(URLS["DASHBOARD"]);

    await page.waitForURL(URLS["DASHBOARD"]);
  });
});
