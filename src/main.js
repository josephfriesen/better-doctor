import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/styles.scss';
import $ from 'jquery';
import DoctorSearch from './doctor-query.js'


$(document).ready(function() {
  $('form#input').submit(function(event) {
    event.preventDefault();
    $('.doctors').html('');
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
          for (let i = 0; i < len; i++) {
            $('.doctors').append(`<div class='doctor' id='doctor-${i}'></div>`);
            $(`#doctor-${i}`).html(`<div class='doctor-img' id='doctor-img-${i}'></div><div class='doctor-info' id='doctor-info-${i}'></div>`);
            $(`#doctor-img-${i}`).html(`img ${i}`);
            $(`#doctor-info-${i}`).html(`info $${i}`);
          }
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
