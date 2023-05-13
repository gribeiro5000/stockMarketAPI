var apiKey = `1D0KB1CVSUC9D3T3`
var urlNews = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${apiKey}`

var allNews = getAllNews()

$(`#searchButtonHeader`).click(e => { 
    e.preventDefault();
    if($(`#searchBoxHeader`).val() != ``){
        window.location.href = `./searchResult.html?keywords=${$(`#searchBoxHeader`).val()}`
    } else {
        alert(`valor vazio`)
    }
});

//get all news
function getAllNews() {
    fetch(urlNews).then(response => {
        return response.json()
    }).then(data => {
        console.log(data)
        createAllNewsPage(data)
    })
}

function createAllNewsPage(allNews){
    for(var pos = 0; pos < allNews.feed.length; pos++){
        $(`#news`).append(`
        <div class="card">
            <a href="${allNews.feed[pos].url}">
                <div class="title">   
                    <h2>${allNews.feed[pos].title}</h2>
                    <p>${allNews.feed[pos].summary}</p>
                </div>
                <img src="${allNews.feed[pos].banner_image}" alt="">
            </a>
        </div>
        <hr size="1" width="100%">`);
    }
}

