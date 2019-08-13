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
    if (z === new ZipCode(z)) {
      return z
    }
  } catch (e) {
    if (e instanceof ZipCodeFormatException) {
      return ZIPCODE_INVALID
    }
    return ZIPCODE_UNKNOWN_ERROR
  }
  // return verifyZipCode()
}

const formElement = document.querySelector('#form')

formElement.addEventListener('submit', () => {
  // e.preventDefault()
  const display = document.querySelector('#display-picks')
  const zipInput = document.querySelector('input').value
  const zipcode = ZipCode(zipInput)
  const url = new URL('http://127.0.0.1:7001')
  // const url = new URL(document.location)
  const queryStr = `location=${zipcode}`
  queryStr.replace
  console.log(JSON.stringify(queryStr))
  console.log(zipcode)


  const postReq = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }),
    body: JSON.stringify(queryStr),
    mode: 'cors',
  }


  fetch(`${url}`, postReq)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))


  // formElement.zipInput.value('')
})
// TODO: create filter function that allows user to exclude places (i.e: dietary restrictions, allergies, etc.)

// TODO: Create a function for picking a place at random

// TODO: Create a UI slider to limit/expand search distance

