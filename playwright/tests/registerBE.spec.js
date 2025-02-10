import { test, expect} from '@playwright/test'
import { HEADINGS, URLS, utils, VALID_LOGIN_PAYLOAD, generateUserCredentials } from '../fixtures'
import { RegisterAPI } from '../POM/modules/API'
import { register } from 'module';

test.describe('register API backend', () => {
    let registerAPI;
    const {username, email, password} = generateUserCredentials(6);

    test.beforeEach('register user', ({ page }) => {
        registerAPI = new RegisterAPI(page);
    })

    test('register a user no username', async({ page }) => {
        const response = await registerAPI.register(email, password);

        expect(response.status).toBe("The username field is required");

    })

    test('register user without email', async({ page }) => {
        const response = await registerAPI.register(username, password);

        expect(response.status).toBe("The email field is required");

    })

    test('register user without password', async({ page }) => {
        const response = await registerAPI.register(username, email);

        expect(response.status).toBe("The password field is required");

    })

    test('register a user using backend', async({ page }) => {
        const response = await registerAPI.register(username, email, password);

        expect(response.status).toBe("Success");
        expect(response.user.username).toBe(username);
        expect(response.user.email).toBe(email);
    })
})