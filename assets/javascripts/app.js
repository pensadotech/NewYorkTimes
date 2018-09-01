// javascript exercise using New York Time APIs

// New York Times API - Headlines
// ref:: http://nyt-mongo-scraper.herokuapp.com/api/headlines

// New York API - news and information
// ref: https://developer.nytimes.com/

// Top Stories "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=66fa7bed54ac4b6db03807e69bf5511c"
// var topic = 'national';
// var url = `https://api.nytimes.com/svc/topstories/v2/${topic}.json?api-key=66fa7bed54ac4b6db03807e69bf5511c`;

// archive
// var searchTerm = 'weather';
// var startYer = '2018';
// var month = '2';
// url = `https://api.nytimes.com/svc/archive/v1/${startYer}/${month}.json?api-key=66fa7bed54ac4b6db03807e69bf5511c`

// Article
// var beginDate = '20180724';
//     var endDate = '20180101';
//     var query = 'weather';
//     var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
//     url += '?' + $.param({
//         'api-key': "66fa7bed54ac4b6db03807e69bf5511c",
//         'q': "weather",
//         'begin_date': beginDate,
//         'end_date': endDate
//     })


function displayTopArticles(totalArticles = 3) {

    var topic = 'national';
    var url = `https://api.nytimes.com/svc/topstories/v2/${topic}.json`;
    url += '?api-key=66fa7bed54ac4b6db03807e69bf5511c'

    fetch(url)
        .then(function (response) {
            // Parse response 
            return response.json();
        })
        .then(function (data) {

            //console.log(data);
            let maxArticles = totalArticles;

            // If there is less articles, teh max will be total available 
            if (data.results.length > 0 && data.results.length < maxArticles) {
                maxArticles = data.results.length;
            }

            if (data.results.length > 0) {

                for (let i = 0; i < maxArticles; i++) {
                    // get article 
                    let article = data.results[i];

                    // Create Article HTML structure
                    let articleHtml = `
                    <div class="article">
                        <div class="articleTitle">
                            <h5 class="d-flex d-inline-flex">${article.title}</h5>
                            <a target="_blank" href=${article.url}>
                            Read full article</a>
                        </div>
                    <p id="abstract"> ${article.abstract}</p>
                            <h6 id="author">${article.byline}</h6>
                            <p>Published date: ${article.published_date}</p>
                    </div>
                    `;

                    // append the article
                    let artSect = document.getElementById('articlesSection');
                    artSect.insertAdjacentHTML('beforeend', articleHtml);
                }
            }

        })
        .catch(function (err) {

            console.error(err)
        })
}

function clearArticlesInScreen() {
    // Get an array of all articles 'div'
    let articles = document.getElementsByClassName('article');
    // store how any articles are initially
    let totalArticles = articles.length;
    // loop as many times as total articles
    // but always remove the one in position zero
    // Note: as articles are removed, they are shifted to position zero
    for (let i = 0; i < totalArticles; i++) {
        articles[0].remove();
    }
}

function getTotalArtcilesToDisplay(elementId) {

    var elmnt = document.getElementById(elementId);

    if (elmnt.selectedIndex == -1) {
        return null;
    }

    return elmnt.options[elmnt.selectedIndex].text;
}

function displaySearchArticles(searchTerm,beginDate,endDate,totalArticles = 3) {

    let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json"

    url += '?api-key=' + "66fa7bed54ac4b6db03807e69bf5511c";

    if (searchTerm != '') {
        url += '&q=' + searchTerm;
    }

    if (beginDate != '') {
        url += '&begin_date=' + beginDate;
    }
    
    if (endDate != '') {
        url += '&end_date=' + endDate;
    }


    fetch(url)
        .then(function (response) {
            // Parse response 
            return response.json();
        })
        .then(function (data) {

            console.log(data.response.docs);

            // desired total articles 
            let maxArticles = totalArticles;

            // If there is less articles, teh max will be total available 
            if (data.response.docs.length > 0 && data.response.docs.length < maxArticles) {
                maxArticles = data.response.docs.length;
            }

            if (data.response.docs.length > 0) {

                for (let i = 0; i < maxArticles; i++) {
                    // get article 
                    let article = data.response.docs[i];

                    // Create Article HTML structure
                    let articleHtml = `
                    <div class="article">
                        <div class="articleTitle">
                            <h5 class="d-flex d-inline-flex">${article.headline.main}</h5>
                            <a target="_blank" href=${article.web_url}>
                            Read full article</a>
                        </div>
                    <p id="abstract"> ${article.snippet}</p>
                            <h6 id="author">unknown</h6>
                            <p>Published date: ${article.pub_date}</p>
                    </div>
                    `;

                    // append the article
                    let artSect = document.getElementById('articlesSection');
                    artSect.insertAdjacentHTML('beforeend', articleHtml);
                }
            }


        })
        .catch(function (err) {

            console.error(err)
        })

}

// Events -------------------------------------

function topNewsOnClick() {

    // get the total of articles selected in the screen
    let totArticles = getTotalArtcilesToDisplay('numArticles');

    // clear all articles from screen
    clearArticlesInScreen();
    
    // Display the top articles
    displayTopArticles(totArticles);
}

function SearchNewsOnClick() {

    console.log('search news on click');

    // Search term
    let searchTerm = document.getElementById('srchTerm').value;
    // get the total of articles selected in the screen
    let totArticles = getTotalArtcilesToDisplay('numArticles');
    // Start year 
    let beginDate = document.getElementById('startYear').value;
    // Endyear 
    let endDate = document.getElementById('endYear').value;

    console.log(searchTerm);
    console.log(totArticles);
    console.log(startYear);
    console.log(endYear);

    // clear all articles from screen
    clearArticlesInScreen();
    
    // beginDate = '20180101';
    // endDate = '20180101';
    //searchTerm = 'North Korea';

    // Look for artciels and display
    displaySearchArticles(searchTerm,beginDate,endDate,totArticles);

}

function resetArticlesOnClick() {

    // clear all articles from screen
    clearArticlesInScreen();
}