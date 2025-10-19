import { expect, test } from "@/fixtures";

test.describe("Login", () => {
  test("when the user is on the homepage, then a login button is visible that navigates to the login page", async ({
    loginPage,
    indexPage,
  }) => {
    await indexPage.goto();

    await test.step("verify login button is visible", async () => {
      await expect(indexPage.loginLink).toBeVisible();
    });

    await test.step("navigate to login page", async () => {
      await indexPage.login();
    });

    await test.step("verify login page is visible", async () => {
      expect(await loginPage.isVisible()).toBe(true);
    });
  });

  test("when the login is successful, then the user is redirected to the dashboard", async ({
    loginPage,
    dashboardPage,
    user,
  }) => {
    await loginPage.goto();

    await test.step("login with valid credentials", async () => {
      await loginPage.login(user);
    });

    await test.step("verify dashboard is visible", async () => {
      expect(await dashboardPage.isVisible()).toBe(true);
    });
  });

  test("when the login credentials are invalid, then an error message is shown", async ({
    loginPage,
    user,
  }) => {
    await loginPage.goto();

    await test.step("attempt login with invalid credentials", async () => {
      await loginPage.login({ email: user.email, password: "wrongpassword" });
    });

    await test.step("verify error message is shown", async () => {
      await expect(loginPage.invalidCredentialsMessage).toBeVisible();
    });
  });

  test("when navigating to a protected page without being authenticated, then the user is redirected to the login page", async ({
    dashboardPage,
    loginPage,
  }) => {
    await dashboardPage.goto();

    await test.step("verify redirection to login", async () => {
      expect(await loginPage.isVisible()).toBe(true);
    });
  });
});
