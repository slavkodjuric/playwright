import { test, expect } from "@playwright/test";
import { LoginAPI } from "../../POM/modules/API/loginAPI";
import { VALID_LOGIN_PAYLOAD, utils } from "../../fixtures";

test.describe("login API tests", () => {
  let loginAPI;
  const emailErrorMessage = "The email field is required";
  const passwordErrorMessage = "The password field is required";
  const unauthorizedResponse = "Unauthorized";

  test.beforeEach("instantiate class", ({ page }) => {
    loginAPI = new LoginAPI(page);
  });

  test("Login with no email", async ({}) => {
    const response = await loginAPI.login("", VALID_LOGIN_PAYLOAD["PASSWORD"]);
    expect(response.message).toBe(emailErrorMessage);
  });

  test("Login with no password", async ({}) => {
    const response = await loginAPI.login(VALID_LOGIN_PAYLOAD["EMAIL"], "");
    expect(response.status).toBe(passwordErrorMessage);
  });

  test("Login with invalid password", async ({}) => {
    const response = await loginAPI.login(
      VALID_LOGIN_PAYLOAD["EMAIL"],
      utils.generateRandomString(6)
    );
    expect(response.message).toBe(unauthorizedResponse);
  });

  test("Login with invalid email", async ({}) => {
    const response = await loginAPI.login(
      utils.generateRandomString(6),
      VALID_LOGIN_PAYLOAD["PASSWORD"]
    );
    expect(response.message).toBe(unauthorizedResponse);
  });

  test("login via BackEnd", async ({}) => {
    const response = await loginAPI.login(
      VALID_LOGIN_PAYLOAD["EMAIL"],
      VALID_LOGIN_PAYLOAD["PASSWORD"]
    );

    expect(response.status).toBe("Success");
    expect(response.user.email).toBe(VALID_LOGIN_PAYLOAD["EMAIL"]);
  });
});
