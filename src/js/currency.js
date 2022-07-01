// A user should be able to enter an amount (in U.S. dollars) and then specify another currency (such as the South Korean won). The user should then see the total amount they entered in converted currency. In the example above, a user might enter 10 dollars and then see that amount in South Korean won.
// Users should be able to convert U.S. currency into at least 5 other types of currency.
// If the API call results in an error (any message not a 200 OK), the application should return a notification to the user that states what the error is. (That means the error should show up in the DOM, not in the console.)
// If the query response doesn't include that particular currency, the application should return a notification that states the currency in question doesn't exist. (Note: Even if you use a dropdown menu to specify currencies instead of a form field, you'll still need to add this functionality to your code.)
import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../css/styles.css";
import CurrencyService from "./src/js/currency-service.js";

$(document).ready(function() {
  $("form#form").submit(function(event){
    event.preventDefault();
    const amount = $("#amount").val();
    const currencyToExchange = $('#currency').val();
    
    let promise = CurrencyService.getCurrency(amount, currencyToExchange);
    promise.then((response) => {
      const body = JSON.parse(response);
      $("output-exchange").text(`The value of USD to ${currencyToExchange} is ${body.conversion_rate}`);
    }, function(error) {
      $("#output-error").text(`There was an error processing your request: ${error}`)
    });
  })
});