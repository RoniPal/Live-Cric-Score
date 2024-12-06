//Document Uploading
let container = document.querySelector(".container")
let upcoming = document.querySelector(".upcoming")
let live_btn = document.getElementById("live_btn")
let live_btn_span = document.getElementById("live_btn_span")
let up_btn_span = document.getElementById("up_btn_span")
let up_btn = document.getElementById("up_btn")
let all_btn = document.getElementById("all_btn")
let l2 = document.getElementById("l2")
let up = document.getElementById("up")

// Initially hide content while loading
container.innerHTML = `<img src="loading.svg">`
upcoming.innerHTML = `<img src="loading.svg">`


//API LIVE SCORE call---------------------------------------------------

let callLiveScore = async () => {
	
	setInterval(async()=>{

const url = 'https://free-cricbuzz-cricket-api.p.rapidapi.com/cricket-livescores';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'c7b08594ddmshb6d28f10bdc4e40p1e1865jsn376af869347d',
		'x-rapidapi-host': 'free-cricbuzz-cricket-api.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	//console.log(result)
	let count = 0
	let ihtml = ""
	for(let key in result.response){
		for(let i in result.response[key].matchList){
			//console.log(result.response[key].matchList[i])
			ihtml += `
			 <div class="match">

        <h4>${result.response[key].seriesName}</h4>

        <p class="match-no">${result.response[key].matchList[i].matchFormat}</p>

        <div class="team a">
            <p class="team-nam">${result.response[key].matchList[i].teamOne.name}</p>
            <p class="team-score">${result.response[key].matchList[i].teamOne.score}</p>
        </div>

        <img src="Radio@1x-1.0s-200px-200px (2).svg" alt="">
        <p id="live">LIVE</p>

        <div class="team b">
            <p class="team-nam">${result.response[key].matchList[i].teamTwo.name}</p>
            <p class="team-score">${result.response[key].matchList[i].teamTwo.score}</p>
        </div>

        <p class="match-no">${result.response[key].matchList[i].matchStatus}</p>

        </div>
			`
			count++
		}
		
	}
	live_btn_span.innerHTML = `(${count})`
	container.innerHTML = ihtml
} catch (error) {
	container.innerHTML = error
}
},4000)
}
//call live Score
callLiveScore()

//schedule api--------------------------------------------------

let getSchedule = async () => {
	const url = 'https://free-cricbuzz-cricket-api.p.rapidapi.com/cricket-schedule';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'c7b08594ddmshb6d28f10bdc4e40p1e1865jsn376af869347d',
		'x-rapidapi-host': 'free-cricbuzz-cricket-api.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	//console.log(result);

	let currentTime = new Date()
	console.log(currentTime.getHours())
	let calDay = 24 - currentTime.getHours()
	console.log(calDay)

	let count = 0
	let ihtml=""
	
	for(let key in result.response.schedules){
		for(let i in result.response.schedules[key].matchList){
			for(let j in result.response.schedules[key].matchList[i].seriesList){
				//console.log(result.response.schedules[key].matchList[i].seriesList[j])
				ihtml += `
				<div class="match">

                <h4>${result.response.schedules[key].matchList[i].seriesList[j].seriesName}</h4>

                <p class="team-u">${result.response.schedules[key].matchList[i].seriesList[j].matchTitle}</p>

                <img src="upcoming.svg" alt="loading">
                <p id="upcoming">Upcoming</p>

                <p class="match-no-u">${result.response.schedules[key].matchList[i].seriesList[j].date}<span>&nbsp;&nbsp;${result.response.schedules[key].matchList[i].seriesList[j].startDate}</span></p>

                </div>
				`
				count++
			}
		}
	}
	upcoming.innerHTML = ihtml
	up_btn_span.innerHTML = `(${count})`
} catch (error) {
	console.error(error);
}
}
//call schedule get
getSchedule()


//Live btn-----------------------------
live_btn.addEventListener ("click" , ()=>{
	upcoming.style.display = "none"
	container.style.display = "flex"
	up.style.display = "none"
	l2.style.display = "block"
}) 

//Up BTn--------------------------------
up_btn.addEventListener ("click", ()=>{
		upcoming.style.display = "flex"
		container.style.display = "none"
		up.style.display = "block"
		l2.style.display = "none"
})

//All btn---------------------------------
all_btn.addEventListener("click", ()=>{
	upcoming.style.display = "flex"
	container.style.display = "flex"
	up.style.display = "block"
	l2.style.display = "block"
})

//copyright year change---------------------------------------------------------
let currentyear = document.getElementById("copyYear")
let actualYera = new Date()
currentyear.innerHTML = actualYera.getFullYear()
