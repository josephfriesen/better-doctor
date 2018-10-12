export default class SearchByCondition {
  constructor(condition) {
    this.loc = `45.5204518,-122.6777959`; // Lat & Long of Epicodus
    this.key = process.env.exports.apiKey;
    this.condition = condition;
    this.url = `https://api.betterdoctor.com/2016-03-01/doctors?user_key=${this.key}&location=${this.loc},50&sort=distance-asc&query=${this.condition}`;
  }

  
}
