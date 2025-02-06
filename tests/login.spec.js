import { test, expect } from "@playwright/test";
import { HEADINGS, URLS, utils, VALID_LOGIN_PAYLOAD } from "../fixtures";

test.describe("register a user and log in", () => {
  test.beforeEach("visit the login page", async ({ page }) => {
    await page.goto(URLS["LOGIN"]);
  });
  test("log in with registered user", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(page.locator("h1")).toBeVisible();
    await expect(heading).toHaveText(HEADINGS["LOGIN"]);

    utils.fillAndSubmitForm(page, "input", [
      VALID_LOGIN_PAYLOAD["EMAIL"],
      VALID_LOGIN_PAYLOAD["PASSWORD"],
    ]);

    await page.waitForURL(URLS["DASHBOARD"]);
    await expect(page).toHaveURL(URLS["DASHBOARD"]);
  });
});
