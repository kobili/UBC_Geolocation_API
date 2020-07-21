document.addEventListener('DOMContentLoaded', () => {   // wait for the DOM to load
    document.getElementById('submit-button').addEventListener('click', () => {
        let address = encodeURI(document.getElementById('input-address').value);

        let request = new XMLHttpRequest();
        let url = "http://localhost:3000/" + address;

        request.onload = () => {
          console.log(request.response);
          console.log(typeof request.response);
          if (request.status === 200) {
              let responseJSON = JSON.parse(request.response);
              document.getElementById('latitude-result').textContent = responseJSON.lat;
              document.getElementById('longitude-result').textContent = responseJSON.lon;
          } else if (request.status === 404) {
              let responseJSON = JSON.parse(request.response);
              document.getElementById('error-message').textContent = responseJSON.error;
          }
        };

        request.open('GET', url, true);
        request.send();
    });
});