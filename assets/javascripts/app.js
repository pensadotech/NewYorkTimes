var url = "https://api.nytimes.com/svc/archive/v1/2016/1.json?api-key=";
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
                //$('#results').empty();
                $('#results').append(`
            <h4>${doc.headline.main}</h4>
            <h4><a href="${doc.web_url}" target="_blank">${doc.web_url}</a></h4>
            `)
            });
        })

})