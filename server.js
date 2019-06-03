require('dotenv').config()
const path = require('path')
const yelp = require('yelp-fusion')
const express = require('express')

const app = express()
const apiKey = process.env.YELP_API_KEY
const client = yelp.client(apiKey)
const port = 7001

app.use(express.static(path.join(__dirname, 'public')))
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
 
 client.search({
     term: 'restaurants',
     location: '27601',
     limit: 5,
    }).then(response => {
        console.log(response.jsonBody.businesses)
    }).catch(e => {
        console.log(e)
    })
