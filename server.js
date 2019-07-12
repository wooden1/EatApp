/**
 ** ***************  EATSIT APP ******************
**           composition by Lynnwood Ray
** **********************************************
*/

require('dotenv').config()
const path = require('path')
const yelp = require('yelp-fusion')
const express = require('express')
// const bodyParser = require('body-parser')
// const querystring = require('querystring')

const app = express()
// const urlEncodedParser = bodyParser.urlencoded({ extended: false })
const apiKey = process.env.YELP_API_KEY
const client = yelp.client(apiKey)
const port = 7001

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
    // this.value = zip.match(pattern)[0]
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

const searchReq = {
  term: 'restaurants',
  location: null,
  limit: 5,
}


app.use(express.static(path.join(__dirname, 'public')))

app.get(`/?zip-code=${searchReq.location}`, (req, res) => {
  const { zipcode } = req.query
  if (!verifyZipCode(zipcode)) {
    throw Error(`${zipcode} is not a valid zip code`)
  }
  searchReq.location = zipcode

  client.search(searchReq).then((response) => {
    const results = JSON.stringify(response.jsonBody.businesses, null, 4)
    res.send(results)
  }).catch((e) => {
    throw Error('There was a problem receiving zip-code', e)
  })
})

// app.use((req, res) => res.sendFile(`${__dirname}../../public/index.html`))
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
