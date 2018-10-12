import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/styles.scss';
import $ from 'jquery';
import DoctorSearch from './doctor-query.js';

// Function to take a doctor returned from the Better Doctor API and print their relevant information on the page
const doctorDisplay = (i, result) => {
  const doctor = result.data[i];
  const practices = doctor.practices;
  practices.sort(function(a,b) {
    if (a.distance < b.distance) {
      return -1;
    } else {
      return 1;
    }
  });
  const address = practices[0].visit_address;
  const newPatients = practices[0].accepts_new_patients;
  const phone = practices[0].phones[0].number
    .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

  $('.doctors').append(`<div class='doctor' id='doctor-${i}'></div>`);

  $(`#doctor-${i}`).html(`<div class='doctor-img' id='doctor-img-${i}'></div><div class='doctor-info' id='doctor-info-${i}'></div>`);

  $(`#doctor-img-${i}`).html(`<img src="${doctor.profile.image_url}">`);

  $(`#doctor-info-${i}`).html(`<p>${doctor.profile.first_name} ${doctor.profile.last_name}, ${doctor.profile.title}</p><ul id=${i}></ul>`);

  if (address.street2 == undefined) {
    $(`ul#${i}`).append(`<li><span class="list-label">Address</span>: ${address.street}<br>
    ${address.city}, ${address.state_long} ${address.zip}`);
  } else {
    $(`ul#${i}`).append(`<li><span class="list-label">Address</span>: ${address.street}<br> ${address.street2}<br>
    ${address.city}, ${address.state_long} ${address.zip}`);
  }

  $(`ul#${i}`).append(`<li><span class="list-label">Phone</span>: ${phone}</li>`);

  if (newPatients) {
    $(`#doctor-info-${i}`).append(`Dr. ${doctor.profile.last_name} is currently accepting new patients.`);
  } else {
    $(`#doctor-info-${i}`).append(`Dr. ${doctor.profile.last_name} is not currently accepting new patients.`);
  }

}


$(document).ready(function() {

  let specialtiesList;
  const searchSpecialties = new DoctorSearch();
  const promise = searchSpecialties.get(searchSpecialties.urlSpecialties);
  promise.then(function(response) {
    const result = JSON.parse(response);
    specialtiesList = result.data;
    specialtiesList.sort(function(a,b) {
      if (a.name < b.name) {
        return -1;
      } else {
        return 1
      }
    });
    $('#spec-list').html('');
    for (let i = 0; i < specialtiesList.length; i++) {
      $('#spec-list').append(`<option value='${specialtiesList[i].uid}'>${specialtiesList[i].name}</option>`);
    }
  });

  $('form#input').submit(function(event) {
    event.preventDefault();
    $('.doctors').html('');
    $('.searching').show();
    $('.results').hide();
    $('.no-results').hide();
    $('.error').hide();
    const condition = $('#condition').val();
    const name = $('#name').val();
    const special = $('#spec-list').val().toString();

    const search = new DoctorSearch(condition, name, special);
    let result;
    let promise = search.get(search.url);
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
        for (let i = 0; i < len; i++) {
          doctorDisplay(i, result);
        }
      }
    }, function(error) {
      $('.searching').hide();
      $('.error').show();
      $('#error-msg').text(error.message);
    });

  });
});
