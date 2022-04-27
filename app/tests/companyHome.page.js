import { Selector } from 'testcafe';

class CompanyHomePage {
  constructor() {
    this.pageId = '#companyHome-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const companyHome = new CompanyHomePage();
