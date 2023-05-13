var apiKey = `1D0KB1CVSUC9D3T3`
var ticker = getTickerBtUrl()
var urlSymbolSearch = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${ticker}&apikey=${apiKey}`

getCompanies()

$(`#searchButtonHeader`).click(e => { 
    e.preventDefault();
    if($(`#searchBoxHeader`).val() != ``){
        window.location.href = `./searchResult.html?keywords=${$(`#searchBoxHeader`).val()}`
    } else {
        alert(`valor vazio`)
    }
});

function getCompanies(){
    fetch(urlSymbolSearch).then(response => {
        return response.json()
    }).then(data => {
        console.log(data)
        renderCompanies(data[`bestMatches`])
    })
}

function getTickerBtUrl(){
    var keywords = window.location.href
    var myArray = keywords.split(`?`)
    keywords = myArray[1].substr(9)
    return keywords
}

function renderCompanies(data){
    if(data.length > 0){
        data.forEach(element => {
            $(`#conteiner3`).append(`
            <div class="companyBox">
                <a href="./assetsAnalytics.html?symbol=${element[`1. symbol`]}">
                    <h2>${element[`1. symbol`]}</h2>
                    <h3>${element[`2. name`]}</h3>
                </a>
            </div>`)
        });
    }else{
        $(`#conteiner`).append(`<h1 id="title">No Company Found</h1>`)
    }
}