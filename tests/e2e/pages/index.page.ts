import { urls } from "@/constants";
import { PageUrl } from "@/utils/page-url.util";
import { Locator, Page } from "@playwright/test";

export class IndexPage {
  private readonly page: Page;

  private readonly pageUrl: PageUrl;
  private readonly url = urls.index;

  readonly loginLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageUrl = new PageUrl(page);

    this.loginLink = page.getByRole("link", { name: "Log in" });
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async isVisible() {
    return this.pageUrl.isVisible(this.url);
  }

  async login() {
    await this.loginLink.click();
  }
}
