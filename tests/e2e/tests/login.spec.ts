import { expect, test } from "@/fixtures";

test.describe("Login", () => {
  test("redirects to dashboard on login success", async ({
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

  test("shows error on invalid credentials", async ({ loginPage, user }) => {
    await loginPage.goto();

    await test.step("attempt login with invalid credentials", async () => {
      await loginPage.login({ email: user.email, password: "wrongpassword" });
    });

    await test.step("verify error message is shown", async () => {
      await expect(loginPage.invalidCredentialsMessage).toBeVisible();
    });
  });
});
