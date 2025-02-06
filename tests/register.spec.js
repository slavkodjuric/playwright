import { test, expect } from "@playwright/test";
import { HEADINGS, URLS, generateUserCredentials, utils } from "../fixtures";

test.describe("register a user", () => {
  const { username, email, password } = generateUserCredentials(5);
  test.beforeEach("visit the login page", async ({ page }) => {
    await page.goto(URLS["REGISTER"]);
  });
  test("register with valid data", async ({ page }) => {
    const heading = page.locator("h1");
    await heading.waitFor();
    await expect(heading).toHaveText(HEADINGS["REGISTER"]);

    utils.fillAndSubmitForm(page, "input", [username, email, password]);
    await page.locator("button").click();

    await expect(page).toHaveURL(URLS["DASHBOARD"]);

    await page.waitForURL(URLS["DASHBOARD"]);
  });
});
