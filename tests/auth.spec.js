import { test, expect } from "@playwright/test";
import { HEADINGS, URLS, generateUserCredentials, utils } from "../fixtures";

const { username, email, password } = generateUserCredentials(5);

test.describe.configure({ mode: "serial" });
test.describe("register a user and log in", () => {
  test("register with valid data", async ({ page }) => {
    //steps:
    //visit site
    await page.goto(URLS["REGISTER"]);

    const heading = page.locator("h1");
    await heading.waitFor();
    await expect(heading).toHaveText(HEADINGS["REGISTER"]);

    utils.fillAndSubmitForm(page, "input", [username, email, password]);
    await page.locator("button").click();

    await expect(page).toHaveURL(URLS["DASHBOARD"]);

    await page.waitForURL(URLS["DASHBOARD"]);
  });

  test("log in with registered user", async ({ page }) => {
    await page.goto(URLS["LOGIN"]);

    const heading = page.locator("h1");
    await expect(page.locator("h1")).toBeVisible();
    await expect(heading).toHaveText(HEADINGS["LOGIN"]);

    utils.fillAndSubmitForm(page, "input", [email, password]);

    await page.waitForURL(URLS["DASHBOARD"]);
    await expect(page).toHaveURL(URLS["DASHBOARD"]);
  });
});
