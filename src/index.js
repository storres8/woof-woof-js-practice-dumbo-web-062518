document.addEventListener("DOMContentLoaded", function(){
  //this is calling our DB, transforming it into JSON, and then we are
  // taking our JSON data and sending it through renderPups
  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(res => renderPups(res))

  function getPup(id) {
   return fetch(`http://localhost:3000/pups/${id}`)
      .then(res => res.json())
      .then(showPup)
  }


  //
  function updatePup(pup, data) {
    return fetch(`http://localhost:3000/pups/${pup.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isGoodDog: data
      })
    })
    .then(res => res.json())
    .then(showPup)
  }


function renderPups(pups) {
  const container = document.querySelector('#dog-bar')
  const filter = document.querySelector('#good-dog-filter')
  pups.forEach(pup => {
    const span = document.createElement('span')
    span.innerText = pup.name
    span.dataset.id = pup.id
    span.addEventListener("click", handleShow)
    container.append(span)
    })
};

function handleShow(e) {
  const id = e.target.dataset.id
  getPup(id)
}


function showPup(pup) {
  const container = document.querySelector('#dog-info')
  container.innerHTML = ''
  // ^makes it so only one showPup is shown at a time
  const img = document.createElement('img')
  img.src = pup.image

  const h = document.createElement('h2')
  h.innerHTML = pup.name

  const button = document.createElement('button')
  button.innerText = pup.isGoodDog === true ? "Good Dog" : "Bad Dog"

  button.addEventListener("click", function(){
    pup.innerText === "Good Dog" ? "Bad Dog" : "Good Dog"
    let data =! pup.isGoodDog
    console.log(data)
    updatePup(pup, data)
  })
  button.dataset.id = pup.id
  // button.onclick =
  container.append(img, h, button)
};

function filterPups(pups) {
  const on = "Filter good dogs: ON"
  const off = "Filter good dogs: OFF"
  let goodPups = []
  const filter = document.querySelector('#good-dog-filter')
  filter.addEventListener("click", () => {
    if (filter.innerHTML === on) {
      goodPups = []
      const dogBar = document.getElementById('dog-bar').innerHTML = ""
      filter.innerHTML = on
      pups.forEach(pup => {
        if (pup.isGoodDog === true) {
          goodPups.push(pup)
        }
      })
      renderPups(goodPups)
    } else {
      filter.innerHTML = off
      const dogBar = document.getElementById('dog-bar').innerHTML = ""
      renderPups(pups)
    }
  })
};

})
