import { Selector } from 'testcafe';

class BrowseCompaniesPage {
  constructor() {
    this.pageId = '#browse-companies-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async clickOnCompany(testController, id) {
    await testController.click(Selector(`#view-company/${id}`));
  }

  /** Checks that the current page has at least six profiles on it.  */
  async hasDefaultProfiles(testController) {
    const cardCount = Selector('.ui .card').count;
    await testController.expect(cardCount).gte(1);
  }
}

export const browseCompaniesPage = new BrowseCompaniesPage();
