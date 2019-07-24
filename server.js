/**
 ** ***************  EATSIT APP ******************
**           composition by Lynnwood Ray
** **********************************************
*/

require('dotenv').config()
const path = require('path')
const yelp = require('yelp-fusion')
const express = require('express')
const bodyParser = require('body-parser')
const querystring = require('querystring')
const cors = require('cors')


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
  distance: 8046.72, // 5 miles
  limit: 2,
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res) => res.render('index'))
app.post('/', cors(), (req, res) => {
  const zipcode = req.body.location
  if (verifyZipCode(zipcode) !== zipcode) {
    throw Error(`${zipcode} is not a valid zip code`)
  } else {
    searchReq.location = zipcode
  }

  const results = client.search(searchReq).then((response) => {
    const data = JSON.stringify(response.jsonBody.businesses, null, 4)
    // console.log(results)
    return data
  }).catch((e) => {
    throw Error('Problem with defined search requirements', e)
  })
  res.send(results)
})

app.use(express.static(path.join(__dirname, 'public')))
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
