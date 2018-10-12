import SearchByCondition from './../src/doctor-query.js';

describe('The SearchByCondition object', function() {

  const testSearch = new SearchByCondition("headache");

  beforeEach(function() {
    //
  });

  it('should build the correct url for the API call with correct user_key, location and query attributes', function() {
    expect(testSearch.url).toEqual(`https://api.betterdoctor.com/2016-03-01/doctors?user_key=${process.env.exports.apiKey}&location=45.5204518,-122.6777959,50&sort=distance-asc&query=headache`);
  });


});
