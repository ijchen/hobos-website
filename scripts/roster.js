function getHeroImageSource(heroName) {
	let heroNameMap = {
		"Ana": "ana",
		"Ashe": "ashe",
		"Baptiste": "baptiste",
		"Bastion": "bastion",
		"Brigitte": "brigitte",
		"Cassidy": "cassidy",
		"Doomfist": "doomfist",
		"D. Va": "dva",
		"Echo": "echo",
		"Genji": "genji",
		"Hanzo": "hanzo",
		"Junkrat": "junkrat",
		"Lúcio": "lucio",
		"Mei": "mei",
		"Mercy": "mercy",
		"Moira": "moira",
		"Orisa": "orisa",
		"Pharah": "pharah",
		"Reaper": "reaper",
		"Reinhardt": "reinhardt",
		"Roadhog": "roadhog",
		"Sigma": "sigma",
		"Soldier: 76": "soldier-76",
		"Sombra": "sombra",
		"Symmetra": "symmetra",
		"Torbjörn": "torbjorn",
		"Tracer": "tracer",
		"Widowmaker": "widowmaker",
		"Winston": "winston",
		"Wrecking ball": "wrecking-ball",
		"Zarya": "zarya",
		"Zenyatta": "zenyatta",
	};
	
	if(!(heroName in heroNameMap)) {
		throw new Error(`Invalid hero name: "${heroName}"`)
	}
	
	return `assets/images/heroes/${heroNameMap[heroName]}.png`;
}

function createCardFromData(playerData) {
	const cardsElem = $("#cards");
	const cardElem = $("<div></div>");
	
	// Card "card" class
	cardElem.addClass("card")
	
	// Card background
	let cardBgCont = document.createElement("div");
	cardBgCont.classList.add("cardBackgroundContainer");
	let cardBgElem = document.createElement("img");
	cardBgElem.src = getHeroImageSource(playerData.mains[0]);
	cardBgElem.alt = "TODO";
	cardBgElem.classList.add("cardBackground");
	cardBgCont.appendChild(cardBgElem);
	cardElem.append(cardBgCont);
	
	// Name text
	let nameElem = document.createElement("h1");
	nameElem.append(document.createTextNode(playerData.name));
	nameElem.classList.add("cardName");
	cardElem.append(nameElem);
	
	// Stats text
	let statsElem = document.createElement("div");
	
	for(let statString of [
		`Battletag: ${playerData.battletag}`,
		`Role: ${playerData.role}`,
		`SR: ~${playerData.sr}`,
		`Hours played: ${playerData.hoursPlayed}`,
		`Level: ${playerData.level}`,
		"Mains:"
	]) {
		let statP = document.createElement("p");
		statP.appendChild(document.createTextNode(statString));
		statP.classList.add("cardStatsText")
		statsElem.append(statP);
	}
	
	let heroesTable = document.createElement("ul");
	for(let hero of playerData.mains) {
		let liElem = document.createElement("li");
		heroTextNode = document.createTextNode(hero);
		liElem.append(heroTextNode);
		heroesTable.appendChild(liElem);
	}
	heroesTable.classList.add("cardStatsTable");
	statsElem.append(heroesTable);
	
	statsElem.classList.add("cardStats");
	cardElem.append(statsElem);
	
	// Append cardElem to cardsElem
	cardsElem.append(cardElem);
}

function processPlayerData(allPlayerData) {
	for(let playerData of allPlayerData.players) {
		createCardFromData(playerData);
	}
}

function main() {
	fetch("assets/data/roster.json")
		.then(response => response.json())
		.then(processPlayerData);
}

$(main);