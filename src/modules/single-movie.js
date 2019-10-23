export function movie() {
  fetch("./movies.json").then((response) => {
    return response.json();
  }).then( (data) => {
    let id = getAllUrlParams().id

    if(id != undefined){
      getMovie(id, data);
      playVideo()
    }
  })
  }

function playVideo()
{
  document.querySelector('.play').addEventListener('click', (e) => {
    let url = e.target.getAttribute('data-url');
    console.log(url);
    let content = `
      <iframe

      src="https://www.youtube.com/embed/${url}?&autoplay=1"
      style="width: 100%; height: 100%"
      class="image"
       frameborder="0"
          picture-in-picture" allowfullscreen></iframe>
    `;
    e.target.parentNode.innerHTML =  content;

  })
}

function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // set parameter name and value (use 'true' if empty)
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {

        // create key if it doesn't exist
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      } else {
        // we're dealing with a string
        if (!obj[paramName]) {
          // if it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string'){
          // if property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          // otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}

function getMovie(id, data)
{
  const movietarget = document.querySelector('.movie');
  let mov = data.find((d) => {

    return d.id == id;
  });

  let content =
  `

  <h1 class="movie__title">${mov.title} &nbsp;&nbsp; <span class="release-date">${mov.release_date}</span> </h1>

  <div class="movie__trailer">
      <img class="image" src="${mov.image}" alt="">
      <img src="./play.png" alt="" class="play" data-url="${mov.url}">
  </div>

  <div class="description">
      ${mov.description}
  </div>


  `;

  movietarget.innerHTML = content;
}
