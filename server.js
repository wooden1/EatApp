/**
 ** ***************  EATSIT APP ******************
**           composition by Lynnwood Ray
** **********************************************
*/

require('dotenv').config()
const path = require('path')
const yelp = require('yelp-fusion')
const express = require('express')

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
  const pattern = /[0-9]{5}([- ]?[0-9]{4})?/
  if (!pattern.test(zip)) {
    throw new ZipCodeFormatException(zip)
  } else {
    return zip
  }
}

const searchReq = {
  term: 'restaurants',
  location: null,
  distance: 8046.72, // 5 miles
  limit: 3,
}

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.post('/results', (req, res) => {
  const zipcode = req.body.location
  if (ZipCode(zipcode) !== zipcode) {
    throw Error(`${zipcode} is not a valid zip code`)
  } else {
    searchReq.location = zipcode

    client
      .search(searchReq)
      .then(response => JSON.stringify(response.jsonBody.businesses, null, 4))
      .then(data =>
        res.send(data))
      .catch((err) => {
        console.log(err)
      })
  }
})

app.use(express.static(path.join(__dirname, 'public')))
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
