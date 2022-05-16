function productListener() {
    getAllProductsAPI()
        .then(function (result) {
        }).catch(function (error) {
        console.log(error)
    });
}

function productLoader(result) {
    console.log("product loader=>")
    console.log(result)
    for (let i = 0; i < result.length; i++) {
        console.log(i)
        console.log(result[i])
        let product = result[i]
        loadProductInNewCard(product)
        //todo create a new product and load in cards
    }
}

function loadProductInNewCard(product) {
    $("#tournamentLoader").hide();
    console.log("inside load product" ,product)
    let ids = "PRODUCT" + product.productid;
    const cardParent = document.getElementById("tournamentCards")
    console.log(cardParent)


    let carddiv = document.createElement("div");
    carddiv.className = " col-12 col-md-3 px-3 py-2"

    let card = document.createElement("div");
    card.className = "card";
    card.id = ids
    card.setAttribute("onclick","loadSpecificMovie(this)");


    let image = document.createElement("img");
    image.src = product.image
    image.className = "card-img-top";
    // image.setAttribute("width","50%");
    // image.setAttribute("height","50%");


    let productName = document.createElement("h5");
    productName.id = ids + "PRODUCT_NAME" + product.id;
    productName.className = "text-upper";
    productName.innerText = product.productname;

    let productBrand = document.createElement("h5");
    productBrand.id = ids + "PRODUCT_BRAND" + product.id;
    productBrand.className = "text-upper";
    productBrand.innerText = product.brandname;

    let cardBody = document.createElement("div");
    cardBody.className = "card-body bg-dark rounded-lg p-2";

    let price = document.createElement("span")
    // price.className = "fa fa-star text-primary fa-xs"
    price.innerText = "AMOUNT: " + product.price;

    cardBody.appendChild(productName);
    cardBody.appendChild(price)


    card.appendChild(productBrand);
    card.appendChild(image);
    card.appendChild(cardBody);


    carddiv.appendChild(card);
    cardParent.appendChild(carddiv);
}


function loadTournamentInExistingCard(tournament, ids) {

    let tournamentNames = document.getElementById(ids + "NAMES" + tournament.id);
    tournamentNames.innerText = tournament.name;
    let tournamentprize = document.getElementById(ids + "NAME" + tournament.id);
    var total = 0;
    tournament.prizePool.forEach(element => {
        total += element;
    });
    tournamentprize.innerText = "prize pool" + '\n' + total;
    let amount = document.getElementById(ids + "AMOUNT" + tournament.id);
    amount.innerText = "Amount " + '\n' + tournament.amount;
    let time = document.getElementById(ids + "TIME" + tournament.id);
    let timestamp = tournament.time.seconds * 1000;
    let tournamentDate = new Date(timestamp).toLocaleString(undefined, {
        month: 'short',
        day: '2-digit',
        year: 'numeric'

    })
    let tournamentTime = new Date(timestamp).toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit'
    });
    time.innerHTML = tournamentDate + "<br>" + tournamentTime;
    let players = document.getElementById(ids + "PLAYERS" + tournament.id);
    players.innerHTML = "seats <br>" + (tournament.totalSeats - tournament.vacantSeats) + "/" + tournament.totalSeats;
    let progressBar = document.getElementById(ids + "PROGRESS_BAR" + tournament.id);
    let percent = ((tournament.totalSeats - tournament.vacantSeats) / tournament.totalSeats) * 100;
    progressBar.setAttribute("style", "width :" + percent + "%");
    progressBar.innerHTML = parseInt(percent) + "% full";
    let remainig = document.getElementById(ids + "REMAINING" + tournament.id);
    remainig.innerHTML = tournament.vacantSeats + " remaining";
}


function formatResponse(res) {
    const ta = Object.keys(res).map(key => ({
        ...res[key],
        tournamentID: key
    }));
    return ta;
}

function loadSpecificTournament(tid) {
    // console.log(tid)
    tid.split("CARD")[1] != undefined ? tid = tid.split("CARD")[1] : tid = tid
    window.location.assign("/tournaments?tid=" + tid);
}

//todo show only unregistered tournaments
//todo in the live tournament tab rename it as registered tournament and click to view it...


function gatherFilterElements() {


    let filterList = [];
    let x;
    GAMES.forEach(element => {
        x = document.getElementById(element.name.toLowerCase()).checked ? filterList.push(element.name.toLowerCase()) : '';
    });

    x = document.getElementById("open").checked ? filterList.push("open") : '';
    x = document.getElementById("full").checked ? filterList.push("full") : '';
    x = document.getElementById("today").checked ? filterList.push("today") : '';
    x = document.getElementById("tomorrow").checked ? filterList.push("tomorrow") : '';
    //yet to do
    if (document.getElementById("customDates").value)
        x = document.getElementById("customDate").checked ? filterList.push("customDate") : '';
    // console.log(filterList)
    applyFilter(filterList)
}

function applyFilter(filterIDs) {
    if (filterIDs.length != 0) {
        let tidList = [];
        for (let i = 0; i < filterIDs.length; i++) {

            GAMES.forEach(element => {
                if (filterIDs[i] == element.name.toLowerCase()) {
                    tidList = tidList.concat(getRequiredTournamentList("gameName", element.name));
                }

            });

            if (filterIDs[i] == "open") {
                tidList = tidList.concat(getRequiredTournamentList("gameStatus", "open"));
            }
            if (filterIDs[i] == "full") {
                tidList = tidList.concat(getRequiredTournamentList("gameStatus", "full"));
            }
            if (filterIDs[i] == "today") {
                tidList = tidList.concat(getRequiredTournamentList("date", "today"));
            }
            if (filterIDs[i] == "tomorrow") {
                tidList = tidList.concat(getRequiredTournamentList("date", "tomorrow"));
            }
            if (filterIDs[i] == "customDate") {
                tidList = tidList.concat(getRequiredTournamentList("customDate", document.getElementById("customDates").value));
            }

        }
        let reqList = [...new Set(tidList)];
        // console.log(reqList)
        deleteAllCards();
        $("#tournamentLoader").show()
        if (reqList.length != 0) {
            for (let i = 0; i < reqList.length; i++) {
                for (let j = 0; j < tournamentHolder.length; j++) {
                    if (reqList[i] == tournamentHolder[j].id) {
                        loadTournamentInNewCard(tournamentHolder[j], "tournamentCards")
                        break;
                    }
                }
            }
        } else {
            $("#tournamentLoader").hide()
            if ($("#noData").length == 0)
                $("#tournamentCards").append("<p class=\"mx-auto my-5\" id=\"noData\">No data found</p>")
        }
    } else {
        // if no filters are selected
        if ($("#noData").length != 0) {
            $("#noData").remove()
        }

        tournamentListener()
    }
}


function getRequiredTournamentList(filterType, filterID) {

    let tidList = [];
    tournamentHolder.forEach(function (tournament) {
        for (let i = 0; i < GAMES.length; i++) {
            if (GAMES[i].gameID == tournament.gameID) {
                switch (filterType) {
                    case "gameName":
                        if (GAMES[i].name == filterID) {
                            tidList.push(tournament.id)
                        }
                    case "gameStatus":
                        if (tournament.vacantSeats != 0 && filterID == "open") {
                            tidList.push(tournament.id)
                        }
                        if (tournament.vacantSeats == 0 && filterID == "full") {
                            tidList.push(tournament.id)
                        }
                    case "date":
                        if (filterID == "today" && new Date(Date.now()).toDateString() == new Date(tournament.time.seconds * 1000).toDateString()) {
                            tidList.push(tournament.id)
                        }
                        const tomorrow = new Date(new Date)
                        tomorrow.setDate(tomorrow.getDate() + 1)
                        if (filterID == "tomorrow" && tomorrow.toDateString() == new Date(tournament.time.seconds * 1000).toDateString()) {
                            tidList.push(tournament.id)
                        }
                    case "customDate":
                        if (new Date(filterID).toDateString() == new Date(tournament.time.seconds * 1000).toDateString()) {
                            tidList.push(tournament.id)
                        }

                }
                break;
            }
        }
    });
    // console.log(tidList)
    return tidList;
}

function deleteAllCards() {
    document.getElementById("tournamentCards").remove();
    let newParent = document.createElement("div");
    newParent.className = "d-flex justify-content-between flex-wrap col-12"
    newParent.id = "tournamentCards";
    document.getElementById("tournamentBody").appendChild(newParent);
}


if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById("filter").remove();
}

