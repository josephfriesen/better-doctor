import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/styles.scss';
import $ from 'jquery';
import DoctorSearch from './doctor-query.js'


$(document).ready(function() {
  $('form#input').submit(function(event) {
    event.preventDefault();
    let condition = $('#condition').val();
    if (condition === '') {
      condition = false;
    }
    let name = $('#name').val();
    if (name === '') {
      name = false;
    }

    const search = new DoctorSearch(condition, name);
    console.log(search);
  });
});
