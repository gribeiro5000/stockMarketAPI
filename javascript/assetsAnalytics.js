var apiKey = `1D0KB1CVSUC9D3T3`
var symbol = getTickerBtUrl()
var companyName = ``

var urlTimeSeriesDaily = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`

getTimeSeriesDaily()

$(`#searchButtonHeader`).click(e => { 
    e.preventDefault();
    if($(`#searchBoxHeader`).val() != ``){
        window.location.href = `./searchResult.html?keywords=${$(`#searchBoxHeader`).val()}`
    } else {
        alert(`valor vazio`)
    }
});


//get raw (as-traded) daily open/high/low/close/volume value
function getTimeSeriesDaily(){
    fetch(urlTimeSeriesDaily).then((response) => {
        return response.json()
    }).then((data) => {
        setTickerCompany(data)
        var dataArray = convertObjToArray(data[`Time Series (Daily)`])
        relatoryRender(dataArray)
        renderChart(dataArray)
    })
}

//graphic render
function renderChart(data){

    new Chart($('#valuesChart'), {
        data: {
            labels: data.map(element => element[0]),
            datasets: [{
                type: 'line',
                label: 'Price',
                data: data.map(element => element[1][`4. close`]),
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: true,
            animation: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true
                },
                title: {
                    display: true,
                    text: 'Close Values',
                    color: 'rgb(219, 219, 219)',
                    position: 'top'
                }
            }
        }
    })

    new Chart($('#volumeChart'), {
        data: {
            labels: data.map(element => element[0]),
            datasets: [{
                type: 'bar',
                label: 'Volume',
                data: data.map(element => element[1][`6. volume`]),
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: true,
          animation: true,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: true
            },
            title: {
                display: true,
                text: 'Trading Volume',
                color: 'rgb(219, 219, 219)',
                position: 'top'
            }
          }  
        }
    })
}

function setTickerCompany(data){
    $(`#nameCompany`).append(
        `<h1>${data[`Meta Data`][`2. Symbol`]}</h1>`
    )
}

function relatoryRender(data){
    for(var pos = data.length - 1; pos >= 0; pos--){
        var variation = String((data[pos][1][`4. close`]-data[pos][1][`1. open`])/data[pos][1][`1. open`]*100)
        var day = `${data[pos][0].substr(8, 2)}/${data[pos][0].substr(5, 2)}/${data[pos][0].substr(0,4)}`
        $("#relatory").append(
            `<div class="relatoryDay">
                <div class="element Day">
                    <p class="title">Day</p>
                    <p>${day}</p>
                </div>
                <div class="element Close">
                    <p class="title">Close</p>
                    <p>U$${data[pos][1][`4. close`]}</p>
                </div>
                <div class="element Open">
                    <p class="title">Open</p>
                    <p>U$${data[pos][1][`1. open`]}</p>
                </div>
                <div class="element High">
                    <p class="title">High</p>
                    <p>U$${data[pos][1][`2. high`]}</p>
                </div>
                <div class="element Low">
                    <p class="title">Low</p>
                    <p>U$${data[pos][1][`3. low`]}</p>
                </div>
                <div class="element Variation">
                    <p class="title">Variation</p>
                    <p>${variation.substr(0, 4)}%</p>
                </div>
            </div>
            <hr size="1" width="100%">
            `
        );       
    }
}

function getTickerBtUrl(){
    var keywords = window.location.href
    var myArray = keywords.split(`?`)
    keywords = myArray[1].substr(7)
    return keywords
}

function convertObjToArray(data){
    var dataArray = Object.entries(data)
    dataArray.forEach(element => {
        console.log(element) 
    });
    return dataArray
}