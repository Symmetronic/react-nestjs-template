import { Page } from "@playwright/test";
import { baseUrl } from "playwright.config";

export class PageUrl {
  constructor(private readonly page: Page) {}

  async isVisible(url: string): Promise<boolean> {
    try {
      await this.page.waitForURL(
        (currentUrl) =>
          currentUrl.toString().replace(/\?.*$/, "") === baseUrl + url,
      );
      return true;
    } catch {
      return false;
    }
  }
}
