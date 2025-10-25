import { expect, test } from "@/fixtures";

test.describe("0-login", () => {
  test("GIVEN a user is on the homepage, WHEN the user clicks on the login link, THEN the login page is visible", async ({
    loginPage,
    indexPage,
  }) => {
    await test.step("GIVEN a user is on the homepage", async () => {
      await indexPage.goto();
    });

    await test.step("WHEN the user clicks on the login link", async () => {
      await indexPage.login();
    });

    await test.step("THEN the login page is visible", async () => {
      expect(await loginPage.isVisible()).toBe(true);
    });
  });

  test("GIVEN a user is on the login page, WHEN the user login is successful, THEN the user is redirected to the dashboard page", async ({
    loginPage,
    dashboardPage,
    user,
  }) => {
    await test.step("GIVEN a user is on the login page", async () => {
      await loginPage.goto();
    });

    await test.step("WHEN the user login is successful", async () => {
      await loginPage.login(user);
    });

    await test.step("THEN the user is redirected to the dashboard page", async () => {
      expect(await dashboardPage.isVisible()).toBe(true);
    });
  });

  test("GIVEN a user is on the login page, WHEN the user login is not successful, THEN an error message is shown", async ({
    loginPage,
    user,
  }) => {
    await test.step("GIVEN a user is on the login page", async () => {
      await loginPage.goto();
    });

    await test.step("WHEN the user login is not successful", async () => {
      await loginPage.login({ email: user.email, password: "wrongpassword" });
    });

    await test.step("THEN an error message is shown", async () => {
      await expect(loginPage.invalidCredentialsMessage).toBeVisible();
    });
  });

  test("GIVEN a user is not authenticated, WHEN the user navigates to a protected page, THEN the user is redirected to the login page", async ({
    dashboardPage,
    loginPage,
  }) => {
    await test.step("GIVEN a user is not authenticated", async () => {
      // Is true by default
    });

    await test.step("WHEN the user navigates to a protected page", async () => {
      await dashboardPage.goto();
    });

    await test.step("THEN the user is redirected to the login page", async () => {
      expect(await loginPage.isVisible()).toBe(true);
    });
  });
});
