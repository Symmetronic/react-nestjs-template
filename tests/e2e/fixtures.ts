import { DashboardPage } from "@/pages/dashboard.page";
import { IndexPage } from "@/pages/index.page";
import { LoginPage } from "@/pages/login.page";
import { User } from "@/types/user.type";
import { createTestUser } from "@/utils/user.util";
import { test as base } from "@playwright/test";

type PageObjectModels = {
  dashboardPage: DashboardPage;
  indexPage: IndexPage;
  loginPage: LoginPage;
  user: User;
};

export const test = base.extend<PageObjectModels>({
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  indexPage: async ({ page }, use) => {
    await use(new IndexPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  user: async ({}, use) => {
    const user = await createTestUser();
    await use(user);
  },
});

export const expect = test.expect;
