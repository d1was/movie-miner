export function toppicks() {
  fetch("./top-picks.json").then((response) => {
    return response.json();
  }).then( (data) => {
    setTopPicks(data);
  })

}


function setTopPicks(data)
{
  const toppickwrapper = document.querySelector('.toppick__items');



  data.forEach( (d) => {
      let content = `

      <div class="toppick__item">
        <a href="./movie.html?id=${d.id}" class="image">
          <img src="${d.image}" alt="">
        </a>
        <div class="details">
          <a href="./movie.html?id=${d.id}" class="title">${d.title}</a>
          <h5 class="genre">${d.genre}</h5>
          <p class="description">${d.description}</p>
          <div class="final-block">
            <span class="rating">${d.rating}</span>
          </div>
        </div>
      </div>
      `;

      toppickwrapper.insertAdjacentHTML("beforeend", content);
  });
}
