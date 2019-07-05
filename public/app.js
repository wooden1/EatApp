/**
 ** ***************  EATSIT APP ******************
**           composition by Lynnwood Ray
** **********************************************
*/


// TODO: Get users zip code to gather list of restuarants near by based on a their distance from user
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
    this.value = zip.match(pattern)[0]
    this.valueOf = function () {
      return this.value
    }
    this.toString = function () {
      return String(this.value)
    }
  } else {
    throw new ZipCodeFormatException(zip)
  }
}

const zipInput = document.querySelector('input').value

function verifyZipCode(z) {
  const ZIPCODE_INVALID = -1
  const ZIPCODE_UNKNOWN_ERROR = -2

  try {
    if (z === new ZipCode(zipInput)) {
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
const formElement = document.querySelector('form')

const request = new XMLHttpRequest()
const display = document.querySelector('display-picks')
const button = document.querySelector('button')

button.addEventListener('click', () => {
  const formData = verifyZipCode(zipInput)
  console.log(formData)
  // return restuarants
  request.open('POST', '127.0.0.1:7001', true)
  request.send(formData)
  const restaurants = fetch('127.0.0.1:7001/?zip-code=location').then(res => res.json()).catch(err =>
    console.error(err))
  console.log(restaurants)
  display.innerHTML(restaurants)
  formElement.zipInput.val('')
})
// TODO: create filtering function that allows user to exclude places (i.e: dietary restrictions, allergies, etc.)


// TODO: Create a function for picking a place at random

// TODO: Create a UI slider to limit/expand search distance

