
/**
 ** ***************  EATSIT APP ******************
 **           composition by Lynnwood Ray
 ** **********************************************
 */

// TODO: Get users zip code to gather list of restuarants near by based on a their distance
function ZipCodeFormatException(value) {
  this.value = value
  this.message = 'does not conform to the expected format for a zip code'
  this.toString = function () {
    return this.value + this.message
  }
}

// Zipcode validation
function ZipCode(zip) {
  const pattern = /[0-9]{5}([- ]?[0-9]{4})?/
  if (!pattern.test(zip)) {
    throw new ZipCodeFormatException(zip)
  } else {
    return zip
  }
}

function verifyZipCode(z) {
  const ZIPCODE_INVALID = -1
  const ZIPCODE_UNKNOWN_ERROR = -2
  try {
    if (z === ZipCode(z)) {
      return z
    }
  } catch (e) {
    if (e instanceof ZipCodeFormatException) {
      return ZIPCODE_INVALID
    }
    return ZIPCODE_UNKNOWN_ERROR
  }
  return verifyZipCode
}

const formElement = document.querySelector('#button')
const display = document.querySelector('#display-picks')

const postFunction = () => {
  const zipInput = document.querySelector('input').value
  const zipcode = verifyZipCode(zipInput)
  const url = new URL('http://localhost:7001/results')

  const queryStr = {
    location: zipcode,
  }

  function appendResultData(data) {
    for (let i = 0; i < data.length; i++) {
      const div = document.createElement('div')
      div.innerHTML = `<div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src="${data[i].image_url}">
            </div>
            <div class="flip-card-back">
              <h2>${data[i].name}
              </h2> 
              <p>${data[i].rating}</p>
              <p>${data[i].location.display_address}
              </p> 
              <p>${data[i].display_phone}</p>
              <p><a href=${data[i].website}>Website</a></p>
            </div>
          </div>
        </div>`

      display.appendChild(div)
    }
  }
  function removeResults(el) {
    if (display.childNodes.length > 1) {
      display.removeChild(el)
    }
  }
  const postReq = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Accept: '*/*',
    },
    body: JSON.stringify(queryStr),
  }

  function status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    }
    return Promise.reject(new Error(response.statusText))
  }

  fetch(url, postReq)
    .then((response) => {
      if (!status(response)) {
        throw new Error(`Bad Request ${response}`)
      }
      return response.json()
    })
    .then((data) => {
      appendResultData(data)
    })
    .catch((err) => {
      throw new Error(err)
    })
}

const input = document.querySelector('input')
formElement.addEventListener('click', postFunction, false)
// Press
input.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    postFunction()
  }
})

// TODO: create filter function that allows user to exclude places (i.e: dietary restrictions, allergies, etc.)

// TODO: Create a function for picking a place at random

