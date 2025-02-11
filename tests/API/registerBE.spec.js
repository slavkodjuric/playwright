import { test, expect } from "@playwright/test";
import {
  utils,
  generateUserCredentials,
} from "../../fixtures";
import { RegisterAPI } from "../../POM/modules/API/registerAPI";

test.describe("register API backend", () => {
  let registerAPI;
  const { username, email, password } = generateUserCredentials(6);
  const emailInvalidResponse = "The email field format is invalid.";

  test.beforeEach("register user", ({ page }) => {
    registerAPI = new RegisterAPI(page);
  });

  test("register a user no username", async ({}) => {
    const response = await registerAPI.register(email, password);

    expect(response.status).toBe("The username field is required");
  });

  test("register user without email", async ({}) => {
    const response = await registerAPI.register(username, password);

    expect(response.status).toBe("The email field is required");
  });

  test("register user without password", async ({}) => {
    const response = await registerAPI.register(username, email);

    expect(response.status).toBe("The password field is required");
  });

  test("register user with invalid email format", async({})=>{
    const response = await registerAPI.register(username, utils.generateRandomString(6), password);

    expect(response.message).toBe(emailInvalidResponse);
  })

  test("register a user using backend", async ({}) => {
    const response = await registerAPI.register(username, email, password);

    expect(response.status).toBe("Success");
    expect(response.user.username).toBe(username);
    expect(response.user.email).toBe(email);
  });
});
