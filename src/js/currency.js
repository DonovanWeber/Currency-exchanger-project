import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../css/styles.css";
import CurrencyService from "./../js/currency-service.js";

function clearFields() {
  $("#output-exchanged").empty();
}
function clearError() {
  $('#output-error').empty();
}

$(document).ready(function() {
  $("#form").submit(function(event){
    event.preventDefault();
    const amount = $("#amount").val();
    const currencyToExchange = $('#currency').val();
    let promise = CurrencyService.getCurrency(amount, currencyToExchange);
    promise.then((response) => {
      const body = JSON.parse(response);
      console.log(body);
      if (body.conversion_result > 0) {
        $("#output-exchange").text(`The value of ${amount} USD is ${body.conversion_result} ${currencyToExchange}`);
        clearError();
      } else {
        $("#output-error").text(`please enter an amount to receive an exchange`);
      }
    }, function(error) {
      console.log(error.result);
      clearFields();
      if (error.result === undefined) {

        $("#output-error").text(`This currency is unavailable: (${currencyToExchange}) please choose a different one`);
      } else {
        $("#output-error").text(`There was an error processing your request ${error}`);
      }
      return false;
    });
  });
});
