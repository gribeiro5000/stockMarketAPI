$(`#searchButton`).click(e => { 
    e.preventDefault();
    if($(`#searchBox`).val() != ``){
        window.location.href = `./searchResult.html?keywords=${$(`#searchBox`).val()}`
    } else {
        alert(`valor vazio`)
    }
});

$(`#searchButtonHeader`).click(e => { 
    e.preventDefault();
    if($(`#searchBoxHeader`).val() != ``){
        window.location.href = `./searchResult.html?keywords=${$(`#searchBoxHeader`).val()}`
    } else {
        alert(`valor vazio`)
    }
});