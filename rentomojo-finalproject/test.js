function parseData(result, namefilter = false) {
    let resObj = JSON.parse(result);
    var games_list = "";
    for (let i = 1; i <= resObj.length - 1; i++) {
        if (namefilter) {
            var newfilteredgame = `<ul id="games_list"></ul>`
            document.getElementById("box").insertAdjacentHTML('beforeend', newfilteredgame)
        }
        var filteredgame = document.getElementById("search").value;
        if (namefilter && !resObj[i].title.toLowerCase().includes(filteredgame.toLowerCase())) {
            continue;
        }
        games_list += `<li id=${resObj[i].title}>
        title :  ${resObj[i].title}
        <ul class="game-item" data-name= ${resObj[i].title}>
        <li>platform : ${resObj[i].platform}</li>
        <li>score: ${resObj[i].score}</li>
        <li>genre : ${resObj[i].genre}</li>
        <li>editors_choice : ${resObj[i].editors_choice}</li>
        </ul>
        </li>`
    }
    document.getElementById("games_list").insertAdjacentHTML('afterbegin', games_list)
}

function makeCall(games, filter = false) {
    fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json")
        .then(response => response.text())
        .then(result => { games(result, filter) })
        .catch(error => error);
}
makeCall(parseData)

function filterGames(elem) {

    document.getElementById("games_list").remove();
    makeCall(parseData, true)
}
