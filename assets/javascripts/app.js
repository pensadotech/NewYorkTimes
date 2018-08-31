var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=";
var apiKey = "14bf828c4c8f4bd3865904dbcc2facb3"
fullURL = url + apiKey;

var searchURL = fullURL + "&q="
var searchTerm = ""
var queryURL;


$('#submit').on('click', function () {
    event.preventDefault();
    searchTerm = $('term').val()
    queryURL = searchURL + searchTerm;
    $.get(queryURL)
    .then(function (request) {
    request.response.docs.forEach(doc => {
            $('#results').append(`
            <h4>${doc.headline.main}</h4>
            `)
        });
    })

})

