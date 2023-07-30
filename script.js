async function getMatchData() {
    return await fetch("https://api.cricapi.com/v1/currentMatches?apikey=8d89fd43-69dd-422e-b054-f8b6ca8dcecb&offset=0")
        .then(data => data.json())
        .then(data => {
            if (data.status != "success")
                return;

            const matchList = data.data;
            if (!matchList)
                return [];

            let liveupdate = [], pastupdate = [], futureupdate = [];
            matchList.forEach(match => {
                if (match.status === "Match not started") {
                    futureupdate.push(match);
                }
                else if (match.matchStarted === true && match.matchEnded === true) {
                    pastupdate.push(match);
                }
                else if (match.matchStarted == true && match.matchEnded === false) {
                    liveupdate.push(match);
                }
            });


            // document.getElementById("livematches").innerHTML=liveupdate.map(match=>(`<div class="card text-bg-dark mb-3" style="max-width: 25rem;">NAME : ${match.name}<br> Current Status : ${match.status}<br> ${match.score[match.score.length-1].inning} <br> Run : ${match.score[match.score.length-1].r} <br> Wicket : ${match.score[match.score.length-1].w} <br> Over : ${match.score[match.score.length-1].o}</div>`)).join('');

            // console.log(liveupdate);
            document.getElementById("livematches").innerHTML = liveupdate.map(match => (`<div class="card text-bg-dark mb-3" style="max-width: 25rem;">
            <div class="card-header">${match.teamInfo[0].name} VS ${match.teamInfo[1].name}</div>
            <div class="card-body">
                <h5 class="card-title">${match.status}</h5>
                <p class="card-text">${match.score[match.score.length - 1].inning} <br> Run : ${match.score[match.score.length - 1].r} &nbsp Wicket : ${match.score[match.score.length - 1].w} &nbsp Over : ${match.score[match.score.length - 1].o} <br></p>
                <p class="card-text">${(match.score.length>1)?match.score[match.score.length - 2].inning:"Yet to Bat"} <br> Run : ${(match.score.length>1)?match.score[match.score.length - 2].r:""} &nbsp Wicket : ${(match.score.length>1)?match.score[match.score.length - 2].w:""} &nbsp Over : ${(match.score.length>1)?match.score[match.score.length - 2].o:""} <br></p>
            </div>
            </div>
        </div>`)).join('');

            document.getElementById("pastmatches").innerHTML = pastupdate.map(match => (`<div class="card text-bg-dark mb-3" style="max-width: 25rem;">
            <div class="card-header">${match.teamInfo[0].name} VS ${match.teamInfo[1].name}</div>
            <div class="card-body">
                <h5 class="card-title">${match.status}</h5>
            </div>
            </div>
        </div>`)).join('');
            // document.getElementById("livematches").innerHTML=liveupdate.map(match=>(`<ul><li style="list-style-type:square;"> NAME : ${match.name}<br> Current Status : ${match.status}<br> ${match.score[match.score.length-1].inning} <br> Run : ${match.score[match.score.length-1].r} <br> Wicket : ${match.score[match.score.length-1].w} <br> Over : ${match.score[match.score.length-1].o}</li></ul>`)).join('');
            // document.getElementById("pastmatches").innerHTML=pastupdate.map(match=>(`<ul><li style="list-style-type:square;"> NAME : ${match.name}<br> RESULT : ${match.status}</li></ul>`)).join('');
            // document.getElementById("futurematches").innerHTML=futureupdate.map(match=>(`<ul><li style="list-style-type:square;"> NAME : ${match.name}<br> RESULT : ${match.status}</li></ul>`)).join('');
        })
}

getMatchData();
