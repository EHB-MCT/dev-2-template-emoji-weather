"use strict";

let emojis = [];

async function getData() {
  console.log("Request the API!");

  console.log("Before fetch");
  fetch('https://api.jsonserve.com/PG3nwa')
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
    const listHtml = document.getElementById('list');
    let htmlString = '';

    data.forEach(emoji => {
      console.log(emoji);
      htmlString += `<li>${emoji.symbol} ${emoji.name}</li>`
    });

    listHtml.innerHTML = htmlString;

  })
}



getData()