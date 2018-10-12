export default class DoctorSearch {
  constructor(condition, name, specialties=false) {
    this.loc = `45.5204518,-122.6777959`; // Lat & Long of Epicodus
    this.key = process.env.exports.apiKey;
    this.condition = condition;
    this.doctorName = name;
    this.specialties = specialties; // specialties should be false or a string of uid's separated by commas
    this.url = `https://api.betterdoctor.com/2016-03-01/doctors?user_key=${this.key}&location=${this.loc},50&sort=distance-asc`;
    if (this.condition) {
      this.url = this.url + `&query=${this.condition}`;
    }
    if (this.doctorName) {
      this.url = this.url + `&name=${this.doctorName}`;
    }
    if (this.specialties) {
      this.url = this.url + `&specialty_uid=${this.specialties}`;
    }
    this.urlSpecialties = `https://api.betterdoctor.com/2016-03-01/specialties?user_key=${this.key}`;
  }

  getResults() {
    const url = this.url;
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }

  getSpecialties() {
    const url = this.urlSpecialties;
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}
