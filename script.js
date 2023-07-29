async function getMatchData(){
    return await fetch("https://api.cricapi.com/v1/currentMatches?apikey=04e49736-e4ec-420b-929e-36b1583ca6e1&offset=0")
        .then(data=>data.json())
        .then(data=>{
            if(data.status!="success")
            return;

            const matchList=data.data;
            if(!matchList)
            return [];

            let liveupdate=[],pastupdate=[],futureupdate=[];
            
            matchList.forEach(match => {
                if(match.matchStarted===false && match.matchEnded===false)
                {
                    futureupdate.push(match);
                }
                else if(match.matchStarted===true && match.matchEnded===true)
                {
                    pastupdate.push(match);
                }               
                else if(match.matchStarted==true && match.matchEnded===false)
                {
                    liveupdate.push(match);
                }
            });

            console.log(liveupdate);
            document.getElementById("livematches").innerHTML=liveupdate.map(match=>(`<ul><li style="list-style-type:square;"> NAME : ${match.name}<br> Current Status : ${match.status}<br> ${match.score[1].inning} <br> Run : ${match.score[1].r} <br> Wicket : ${match.score[1].w} <br> Over : ${match.score[1].o}</li></ul>`)).join('');
            document.getElementById("pastmatches").innerHTML=pastupdate.map(match=>(`<ul><li style="list-style-type:square;"> NAME : ${match.name}<br> Result : ${match.status}</li></ul>`)).join('');
        })
}

getMatchData();