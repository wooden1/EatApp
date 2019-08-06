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
// zip = new String(zip);
  const pattern = /[0-9]{5}([- ]?[0-9]{4})?/
  if (pattern.test(zip)) {
    // zip code value will be the first match in the string
    const { value } = zip.match(pattern)
    this.valueOf = function () {
      return value
    }
    this.toString = function () {
      return String(value)
    }
  } else {
    throw new ZipCodeFormatException(zip)
  }
}

function verifyZipCode(z) {
  const ZIPCODE_INVALID = -1
  const ZIPCODE_UNKNOWN_ERROR = -2

  try {
    if (z === new ZipCode(z)) {
      return z
    }
  } catch (e) {
    if (e instanceof ZipCodeFormatException) {
      return ZIPCODE_INVALID
    }
    return ZIPCODE_UNKNOWN_ERROR
  }
  return verifyZipCode()
}

const formElement = document.querySelector('#form')

formElement.addEventListener('submit', () => {
  // e.preventDefault()
  const display = document.querySelector('#display-picks')
  const zipInput = document.querySelector('input').value
  const zipcode = verifyZipCode(zipInput)
  const url = new URL(`http://127.0.0.1:7001/?location=${zipInput}`)

  const postReq = {
    method: 'POST',
    mode: 'cors',
  }

  fetch(url, postReq)
    .then(res => res.json())
    .then(data => console.log(data))

  //   .then(req => req.json())
  //   .catch((err) => { throw Error('Request failed', err) })
  // if (zipcode !== zipInput) {
  //   // Todo: create modal message to handle zipcode error
  //   console.error('zipcode was incorrect')
  // } else {
  //   fetch(url, postReq)
  //     .then(req => req.json())
  //     .catch((err) => {
  //       throw Error('Request failed', err)
  //     })
  // }

  // return restuarants
  // const restaurants = fetch(`${url}`)
  //   .then(res => res.json())
  //   .then(data => JSON.parse(data))
  //   .then(data => console.log(data))
  //   .catch((err) => {
  //     throw Error('Fetch data did not return properly', err)
  //   })
  // console.log(restaurants)
  // display.textContent = `${restaurants}`
  // formElement.zipInput.value('')
})
// TODO: create filter function that allows user to exclude places (i.e: dietary restrictions, allergies, etc.)

// TODO: Create a function for picking a place at random

// TODO: Create a UI slider to limit/expand search distance

