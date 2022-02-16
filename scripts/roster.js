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
	cardBgElem.alt = `The hero ${playerData.mains[0]} from the video game Overwatch`;
	cardBgElem.classList.add("cardBackground");
	// If they attempt to open the context menu (likely to download) on
	// copyrighted images, show a warning about that and cancel the context menu
	// https://www.blizzard.com/en-us/legal/c1ae32ac-7ff9-4ac3-a03b-fc04b8697010/blizzard-legal-faq#1649365241
	// https://www.blizzard.com/en-us/legal/9c9cb70b-d1ed-4e17-998a-16c6df46be7b/copyright-notices
	$(cardBgElem).on("contextmenu", function(e) {
		alert("These images are copyrighted by Blizzard Entertainment.\n\n®2016 Blizzard Entertainment, Inc. All rights reserved. Overwatch is a trademark or registered trademark of Blizzard Entertainment, Inc. in the U.S. and/or other countries.");
		return false; // Cancel showing the context menu
	});
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

	// It is a requirement that I use at least one of these... I am aware this
	// is not the "correct" way to do this. Trust me this code would not be
	// disgusting if it weren't for a grade
	$(".card").hide();
	const animateNext = (() => {
		// basically made a rust iterator because my assignment is weird
		let idx = 0;
		let cards = $(".card").get();
		
		const f = () => {
			if(idx < cards.length) {
				// $(cards[idx]).fadeIn(500, f);
				$(cards[idx]).slideDown(500, f);
				
				idx++;
			}
		}
		
		return f;
	})();
	let cards = $(".card");
	for(let i = 0; i < cards.length; i++) {
		$(cards[i]).fadeIn(1000 + 500 * i, () => {
			$(cards[i]).addClass("highlight");
		});
	}
}

function main() {
	fetch("assets/data/roster.json")
		.then(response => response.json())
		.then(processPlayerData);
}

$(main);