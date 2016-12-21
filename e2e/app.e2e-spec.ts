import { NgFractalsPage } from './app.po';

describe('ng-fractals App', function() {
  let page: NgFractalsPage;

  beforeEach(() => {
    page = new NgFractalsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
