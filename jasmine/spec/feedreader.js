/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty.
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* This test loops through each feed in the allFeeds objects
     * and ensures it has a defined URL and that the URL is
     * not empty.
     */
    it('have defined URLs that are not empty', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      });
    });

    /* This test loops through each feed in the allFeeds objects
     * and ensures it has a defined name and that the name is
     * not empty.
     */
    it('have defined names that are not empty', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      });
    });
  });


  /* This is the second test suite. This suite is about the side menu. */
  describe('The menu', function() {

    /* This test ensures that the menu is hidden
     * when the application is first loaded.
     */
    it('is hidden by default', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    /* This test ensures that when the menu icon
     * is clicked, the menu is shown. Then when it is clicked
     * again, the menu is propely hidden.
     */
    it('changes visibility when menu icon is clicked', function() {
      let hamburgerMenu = $('.menu-icon-link');

      //test if menu is displayed
      hamburgerMenu.click();
      expect($('body').hasClass('menu-hidden')).toBe(false);

      //test if menu is hidden
      hamburgerMenu.click();
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
  });

  /* This is the third test suite. This suite is about the initial entry
   * in the feed container.
   */
  describe('Initial Entries', function() {

    /* This test ensures that once the loadFeed function completes
     * its work, there is at least a single .entry element within
     * the .feed container.
     */
    beforeEach(function(done) {
      loadFeed(0, done);
    });

    it('at least a single entry within the feed container', function() {
      expect($('.feed .entry').length).toBeGreaterThan(0);
    });
  });

  /* This is the fourth test suite. This suite is about loading different feeds. */
  describe('New Feed Selection', function() {

    //variables used to hold our two feeds after they are loaded
    let feed_before;
    let feed_after;

    /* This test ensures that when a new feed is loaded by the loadFeed
     * function, the content changes and is not the same as the previously
     * loaded feed.
     */
    beforeEach(function(done) {
      loadFeed(0, function() {
        feed_before = $('.feed').html();
        done();
      });
    });

    it('when a new feed is loaded, the content changes', function(done) {
      loadFeed(1, function() {
        feed_after = $('.feed').html();
        expect(feed_after).not.toEqual(feed_before);
        done();
      });

    });

  });

}());
