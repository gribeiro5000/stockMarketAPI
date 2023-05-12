var apiKey = `1D0KB1CVSUC9D3T3`
var symbol = `TSLA`
var companyName = ``

var urlTimeSeriesDaily = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`
var urlSymbolSearch = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${companyName}&apikey=${apiKey}`

getTimeSeriesDaily()


//get raw (as-traded) daily open/high/low/close/volume value
function getTimeSeriesDaily(){
    fetch(urlTimeSeriesDaily).then((response) => {
        return response.json()
    }).then((data) => {
        var dateList = createDateArrays(data[`Time Series (Daily)`])
        console.log(data)
        setTickerCompany(data)
        relatoryRender(data[`Time Series (Daily)`], dateList)
        renderChart(data[`Time Series (Daily)`], dateList)
    })
}

//graphic render
function renderChart(data, dateList){

    new Chart($('#valuesChart'), {
        data: {
            labels: dateList,
            datasets: [{
                type: 'line',
                label: 'Price',
                data: getCloseValues(data, dateList),
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
            labels: dateList,
            datasets: [{
                type: 'bar',
                label: 'Volume',
                data: getVolume(data, dateList),
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

function relatoryRender(data, datelist){
    for(var pos = datelist.length - 1; pos >= 0; pos--){
        var variation = String((data[datelist[pos]][`4. close`]-data[datelist[pos]][`1. open`])/data[datelist[pos]][`1. open`]*100)
        var day = `${datelist[pos].substr(8, 2)}/${datelist[pos].substr(5, 2)}/${datelist[pos].substr(0,4)}`
        $("#relatory").append(
            `<div class="relatoryDay">
                <div class="element Day">
                    <p class="title">Day</p>
                    <p>${day}</p>
                </div>
                <div class="element Close">
                    <p class="title">Close</p>
                    <p>U$${data[datelist[pos]][`4. close`]}</p>
                </div>
                <div class="element Open">
                    <p class="title">Open</p>
                    <p>U$${data[datelist[pos]][`1. open`]}</p>
                </div>
                <div class="element High">
                    <p class="title">High</p>
                    <p>U$${data[datelist[pos]][`2. high`]}</p>
                </div>
                <div class="element Low">
                    <p class="title">Low</p>
                    <p>U$${data[datelist[pos]][`3. low`]}</p>
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

function getCloseValues(data, dateList){
    var closeValueList = []
    for(var pos = 0; pos < dateList.length; pos++){
        closeValueList.push(data[dateList[pos]][`4. close`])
    }
    return closeValueList
}

function getVolume(data, dateList){
    var volumeList = []
    for(var pos = 0; pos < dateList.length; pos++){
        volumeList.push(data[dateList[pos]][`6. volume`])
    }
    return volumeList
}

function createDateArrays(data){
    var date = new Date()
    var dateList = []

    for(var pos = 147; pos > 0; pos--){
        date.setDate(date.getDate() - pos)
        if(typeof data[formatDateYYYYMMDD(date)] == "object"){
            dateList.push(formatDateYYYYMMDD(date))
        }
        date = new Date()
    }


    return dateList
}

function formatDateYYYYMMDD(date){
    var year = String(date.getFullYear())
    var month = String(date.getMonth() + 1)
    var day = String(date.getDate())

    if(month.length < 2){
        month = `0${month}`
    }
    if(day.length < 2){
        day = `0${day}`
    }

    return `${year}-${month}-${day}`
}