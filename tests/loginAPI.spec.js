import { test, expect } from "@playwright/test";
import { HEADINGS, URLS, utils, VALID_LOGIN_PAYLOAD } from "../fixtures";
import { beforeEach } from "node:test";
import { LoginAPI } from "../POM/modules/API/loginAPI";

test.describe("login API tests", () => {
  let loginAPI;

  test.beforeEach("instantiate class", ({ page }) => {
    loginAPI = new LoginAPI(page);
  });
  test("login via BE", async ({ page }) => {
    const response = await loginAPI.login(
      VALID_LOGIN_PAYLOAD["EMAIL"],
      VALID_LOGIN_PAYLOAD["PASSWORD"]
    );
    console.log(response);
    expect(response.status).toBe("Success");
    expect(response.user.email).toBe(VALID_LOGIN_PAYLOAD["EMAIL"]);
  });
});
