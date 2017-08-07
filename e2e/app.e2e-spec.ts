import { SimpleChartsPage } from './app.po';

describe('simple-charts App', () => {
  let page: SimpleChartsPage;

  beforeEach(() => {
    page = new SimpleChartsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
