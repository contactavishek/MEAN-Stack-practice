import { AppPage } from './app.po';
import { browser } from 'protractor';
import { protractor} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display message saying Ristorante Con Fusion', () => {
    page.navigateTo('/');
    expect(page.getParagraphText('app-root h1')).toEqual('Ristorante Con Fusion');
  });

  it('should navigate to about us page by clicking on the link', () => {
    page.navigateTo('/');

    const navlink = page.getAllElements('a').get(1);
    navlink.click();

    expect(page.getParagraphText('h3')).toBe('About Us');
  });

  it('should enter a new comment for the first dish', () => {
    page.navigateTo('/dishdetail/0');

    const EC = protractor.ExpectedConditions;
    const newAuthor = page.getElement('input[type=text]');
    browser.wait(EC.visibilityOf(newAuthor), 5000);
    newAuthor.sendKeys('Test Author');

    const newComment = page.getElement('textarea');
    browser.wait(EC.visibilityOf(newComment), 5000);
    newComment.sendKeys('Test Comment');

    const newSubmitButton = page.getElement('button[type=submit]');
    browser.wait(EC.visibilityOf(newSubmitButton), 5000);
    newSubmitButton.click();

    browser.pause(4200);
  });

});
