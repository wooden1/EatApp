/**
 ** ***************  EATSIT APP ******************
 **           composition by Lynnwood Ray 
 ** **********************************************
 */

 
// TODO: Get users zip code to gather list of restuarants near by based on a their distance from user 
// Zipcode validation
function ZipCode(zip) {
    // zip = new String(zip);
    const pattern = /[0-9]{5}([- ]?[0-9]{4})?/;
    if (pattern.test(zip)) {
        // zip code value will be the first match in the string
        this.value = zip.match(pattern)[0];
        this.valueOf = function () {
            return this.value;
        };
        this.toString = function () {
            return String(this.value);
        };
    } else {
        throw new ZipCodeFormatException(zip);
    }
}

function ZipCodeFormatException(value) {
    this.value = value;
    this.message = 'does not conform to the expected format for a zip code';
    this.toString = function () {
        return this.value + this.message;
    };
}

/*
 * This could be in a script that validates address data
 * for US addresses.
 */


function verifyZipCode(z) {
    const ZIPCODE_INVALID = -1;
    const ZIPCODE_UNKNOWN_ERROR = -2;
     const zipInput = document.querySelector('input');

    try {
        if(z === new ZipCode(zipInput)){return z;} 
    } catch (e) {
        if (e instanceof ZipCodeFormatException) {
            return ZIPCODE_INVALID;
        } 
            return ZIPCODE_UNKNOWN_ERROR;   
    }
}



// TODO: connect to yelp api to receive data about restuarants. using fetch method
//* yelp search api
//  https: //api.yelp.com/v3/businesses/search

// ?term=restuarants&location=27601
 
const restaurants = fetch(http://localhost:3000/restaurants).then(res => res.json()).catch((err) => 
console.error(err))
const display = document.querySelector('#display-picks');
let button = document.querySelector('#button');
button.addEventListener('click',event => {
    // return restuarants;
    console.log(restaurants);
    
});
// TODO: create filtering function that allows user to exclude places (i.e: dietary restrictions, allergies, etc.)
 

// TODO: Create a function for picking a place at random

// TODO: Create a UI slider to limit/expand search distance

