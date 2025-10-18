import { urls } from "@/constants";
import { User } from "@/types/user.type";
import { PageUrl } from "@/utils/page-url.util";
import { Locator, Page } from "@playwright/test";

export class LoginPage {
  static readonly DEFAULT_REDIRECT = urls.dashboard;

  private readonly page: Page;

  private readonly pageUrl: PageUrl;
  private readonly url = urls.login;

  private readonly emailInput: Locator;
  private readonly loginButton: Locator;
  private readonly passwordInput: Locator;

  readonly invalidCredentialsMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageUrl = new PageUrl(page);

    this.emailInput = page.getByLabel("Email");
    this.loginButton = page.getByRole("button", { name: "Log in" });
    this.passwordInput = page.getByLabel("Password");

    this.invalidCredentialsMessage = page.getByText("Invalid credentials", {
      exact: false,
    });
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async isVisible() {
    return this.pageUrl.isVisible(this.url);
  }

  async login(user: User) {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();
  }
}
