import { IntelPage } from './app.po';

describe('intel App', () => {
  let page: IntelPage;

  beforeEach(() => {
    page = new IntelPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
