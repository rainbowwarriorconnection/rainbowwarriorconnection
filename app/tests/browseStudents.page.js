import { Selector } from 'testcafe';

class BrowseStudentsPage {
  constructor() {
    this.pageId = '#browse-students-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async clickOnStudent(testController, id) {
    await testController.click(`#view-student/${id}`);
  }

  /** Checks that the current page has at least six profiles on it.  */
  async hasDefaultProfiles(testController) {
    const cardCount = Selector('.ui .card').count;
    await testController.expect(cardCount).gte(10);
  }
}

export const browseStudentsPage = new BrowseStudentsPage();
