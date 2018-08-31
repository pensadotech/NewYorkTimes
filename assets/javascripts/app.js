var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=";
var apiKey = "14bf828c4c8f4bd3865904dbcc2facb3"
fullURL = url + apiKey;

var searchURL = fullURL + "&q="
var searchTerm = "Trump"
var queryURL = searchURL + searchTerm;
console.log(queryURL);
       
// $.get('queryURL')
// }).done(function (result) {
//     $('#submit').on('click', function () {
        
        
//     })
    
    

//     //console.log(result.response.docs[0].headline.main);
// }).fail(function (err) {
//     throw err;
// });