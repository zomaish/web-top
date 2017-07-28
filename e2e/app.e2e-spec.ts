import { WebTop } from './app.po';

describe('web-top App', () => {
  let page: WebTop;

  beforeEach(() => {
    page = new WebTop();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
