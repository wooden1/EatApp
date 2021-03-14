/**
 ** ***************  EATSIT APP ******************
 **           composition by Lynnwood Ray
 ** **********************************************
 */
;(function () {
  'use strict'

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
  function initListeners() {
    let zipInput = document.querySelector('input')
    formElement.addEventListener('click', () => businessLogic())
    zipInput.addEventListener('keydown', (event) => {
      console.log(event.code)
      if (event.code === 'enter') {
        businessLogic()
      }
    })
  }

  function businessLogic() {
    const display = document.querySelector('#display-picks')
    let zipInput = document.querySelector('input').value
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f2900f" fill-opacity="1" d="M0,96L48,80C96,64,192,32,288,48C384,64,480,128,576,170.7C672,213,768,235,864,240C960,245,1056,235,1152,218.7C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
              <p>${data[i].rating}</p>
              <p>${data[i].location.display_address}
              </p> 
              <p>${data[i].display_phone}</p>
            </div>
          </div>
        </div>`
        display.appendChild(div.firstChild)
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
          console.log('bad request')
        }
        return response.json()
      })
      .then((data) => {
        appendResultData(data)
      })
      .catch((err) => {
        console.error('Error:`', err)
      })
    zipInput = ''
    // return false
    display.removeChild(display)
  }

  initListeners()

  // TODO: create filter function that allows user to exclude places (i.e: dietary restrictions, allergies, etc.)

  // TODO: Create a function for picking a place at random

  // TODO: Create a UI slider to limit/expand search distance
})()
