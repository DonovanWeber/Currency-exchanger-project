export default class CurrencyService {
  static getCurrency(amount, currency) {
    return new Promise((resolve, reject) => {
      let request = XMLHttpRequest();
      const url =`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/USD/${currency}/${amount}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
          console.error();
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}