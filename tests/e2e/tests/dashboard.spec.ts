import { test } from "@/fixtures";

test.describe("Dashboard", () => {
  test("redirects to login if not authenticated", async ({
    dashboardPage,
    loginPage,
  }) => {
    await dashboardPage.goto();

    await test.step("verify redirection to login", async () => {
      await loginPage.isVisible();
    });
  });
});
