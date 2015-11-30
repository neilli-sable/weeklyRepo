/**
 * Test module for weekly.js
 */
var weekly_test = (function() {
  mocha.setup('bdd');
  var assert = chai.assert;

  describe('weekly', function() {
    it ('should there weekly object.', function() {
      if (!weekly) {
        return false;
      }
      return true;
    });
  });

}());
