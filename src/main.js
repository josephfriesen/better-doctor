import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/styles.scss';
import $ from 'jquery';
import DoctorSearch from './doctor-query.js'


$(document).ready(function() {
  $('form#input').submit(function(event) {
    event.preventDefault();
    $('ul.doctors').html('');
    $('.searching').show();
    $('.results').hide();
    $('.no-results').hide();
    $('.error').hide();
    let condition = $('#condition').val();
    if (condition === '') {
      condition = false;
    }
    let name = $('#name').val();
    if (name === '') {
      name = false;
    }

    const search = new DoctorSearch(condition, name);
    let result;
    let promise = search.getResults();
    promise.then(function(response) {
      $('.searching').hide();
      result = JSON.parse(response);
      if (result.data.length == 0) {
        $('.no-results').show();
      }
      else {
        $('.results').show();
        const len = result.data.length;
        if (len < 10) {
          $('#num-doctors-found').text(len);
        } else if (len == 10) {
          $('#num-doctors-found').text("first 10");
        }
        console.log(result.data);
      }
    }, function(error) {
      $('.searching').hide();
      $('.error').show();
      $('#error-msg').text(error.message);
    });

  });
});
