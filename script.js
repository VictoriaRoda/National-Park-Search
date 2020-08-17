'use strict';

function formatQueryParams(params) {
  let queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);

  for (let i = 0; i < responseJson.data.length; i++){
        $('#results-list').append(
      `<li><h3><a href='${responseJson.data[i].url}'>${responseJson.data[i].fullName}</a></h3>
        <p>${responseJson.data[i].description}</p>
        <p>${responseJson.data[i].addresses[0].line1}</p>
        <p>${responseJson.data[i].addresses[0].city}
        ${responseJson.data[i].addresses[0].stateCode}</p>
       </li>`
    )};
  $('#results').removeClass('hidden');
};

function getPark(query, maxResults=10) {

  let apiKey = 'uj8Kj0AXsjerJZcSCciyqE7KNcBREfaltUNXH9sK'
  let searchURL='https://developer.nps.gov/api/v1/parks?';

  let params = {
    stateCode: query,
    limit: maxResults,
    api_key: apiKey
  };

  let queryString = formatQueryParams(params);
  let url = searchURL + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let searchTerm = $('#js-search-term').val();
    let maxResults = $('#js-max-results').val();
    getPark(searchTerm, maxResults);
  });
}

$(watchForm);