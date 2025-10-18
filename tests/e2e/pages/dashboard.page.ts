import { urls } from "@/constants";
import { PageUrl } from "@/utils/page-url.util";
import { Page } from "@playwright/test";

export class DashboardPage {
  private readonly page: Page;

  private readonly pageUrl: PageUrl;
  private readonly url = urls.dashboard;

  constructor(page: Page) {
    this.page = page;

    this.pageUrl = new PageUrl(page);
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async isVisible() {
    return this.pageUrl.isVisible(this.url);
  }
}
