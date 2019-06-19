require('dotenv').config()
const path = require('path')
const yelp = require('yelp-fusion')
const express = require('express')

const app = express()
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

const searchReq = {
    term: 'restaurants',
    location: this.location,
    limit: 5,
}
const {location} = searchReq

app.use(express.static(path.join(__dirname, 'public')))
app.post('/', (req, res) => {
    client.search(searchReq).then(response => {
        // console.log(response.jsonBody.businesses)
        const results = JSON.stringify(response.jsonBody.businesses, null, 4)
        console.log(results)
        res.send(results)
        }).catch(e => {
            console.log(e)
        })   
    })

    

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})