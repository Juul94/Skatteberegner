
function validate() {
	
	/** FINDING THE INPUTS FROM THE HTML **/
	let input_fornavn = document.querySelector("#fornavn");
	let input_efternavn = document.querySelector("#efternavn");
	let input_lon = document.querySelector("#lon");
	let input_region = document.querySelector("#region");

	/** FINDING THE MSG FROM THE HTML **/
	let msg_fornavn = document.querySelector("#msg_fornavn");
	let msg_efternavn = document.querySelector("#msg_efternavn");
	let msg_lon = document.querySelector("#msg_lon");
	let msg_region = document.querySelector("#msg_region");
	
	// IF: THE INPUTS VALUE IS null/empty AND HAVE UNDER 2 CHARACTERS = DISPLAY ERROR MSG AND MAKE INPUT BG RED
	if(input_fornavn.value == null || input_fornavn.value == "" || input_fornavn.value.length < 2) {
		msg_fornavn.style.display = "block";
		input_fornavn.style.backgroundColor = "#FFB3B8";
		
		// WE RETURN TO FALSE, SO THE FUNCTION WONT GO ON (START WITH NEXT STATEMENT), BEFORE IT DOESN'T GET A FALSE RETURN.
		return false;
	}
	
	// ELSE: HIDE ERROR MSG AND MAKE INPUT BG GREEN
	else {
		msg_fornavn.style.display = "none";
		input_fornavn.style.backgroundColor = "#fff";
	}
	
	if(input_efternavn.value == null || input_efternavn.value == "" || input_efternavn.value.length < 2) {
		msg_efternavn.style.display = "block";
		input_efternavn.style.backgroundColor = "#FFB3B8";
		
		return false;
	}
	
	else {
		msg_efternavn.style.display = "none";
		input_efternavn.style.backgroundColor = "#fff";
	}
	
	if(input_lon.value == null || input_lon.value == "" || input_lon.value.length < 2) {
		msg_lon.style.display = "block";
		input_lon.style.backgroundColor = "#FFB3B8";
		
		return false;
	}
	
	else {
		msg_lon.style.display = "none";
		input_lon.style.backgroundColor = "#fff";
	}
	
	if(input_region.value == "Vælg Region") {
		msg_region.style.display = "block";
		input_region.style.backgroundColor = "#FFB3B8";
		
		return false;
	}
	
	else {
		msg_region.style.display = "none";
		input_region.style.backgroundColor = "#fff";
		
		// WE RETURN TO TRUE TO LET THE FUNCTION KNOW IT'S READY TO GO ON WITH CODE UNDERNEATH
		return true;
	}	
}

let btn_submit = document.querySelector("#btn_cal");

// WE TAKE OUR let variable AND CHECK VIA A addEventListener: IF BUTTON CLICKED --> ACTIVATE FUNCTION (skatteberegner)
btn_submit.addEventListener("click", skatteberegner);

function skatteberegner() {
	
	// IF: function validate() == TRUE --> BEGIN USING THIS CODE
	if( validate() ) {

		let msg = document.querySelector("#msg");
		
		// IN CASE OF CHANGED VALUES WHO'VE GIVEN AN ERROR, IT DISPLAYS THE MSG AGAIN IF THE ERRORS HAVE SORTED
		msg.style.display = "block";

		let fornavn = document.querySelector("#fornavn").value;
		let efternavn = document.querySelector("#efternavn").value;
		let lon = document.querySelector("#lon").value;
		let region = document.querySelector("#region").value;
		
		// HERE WE SET THE 'skat' TO 0 AS START VALUE BEFORE WE ENTER THE SWITCH
		let skat = 0;
		let skat2 = 0;

		// switch: HERE WE CHECK THE SWITCH (region) AND SET SOME 'case' AS WE HAVE IN OUR DROPDOWN (option value) AND THEN SETS SOME DATA FOR EACH.
		switch (region) {
			case "Nordjylland":
				skat = 20;
				skat2 = 80;
				// I USE 'skat2' TO MAKE IT EASYER TO COUNT THE PAYOUT AMOUNT (100 - TAX = skat2)
				break;

			case "Midtjylland":
				skat = 25;
				skat2 = 75;
				break;

			case "Syddanmark":
				skat = 30;
				skat2 = 70;
				break;

			case "Sjælland":
				skat = 35;
				skat2 = 65;
				break;

			case "Hovedstaden":
				skat = 40;
				skat2 = 60;
				break;
		}
		
		// CALCULATING THE FOR NUMBERS FOR BEFORE AND AFTER TAX
		let foer_skat = (lon * skat2) / 100;
		let skatte_penge = (lon * skat) / 100;

		// WE USE charAt(0) TO GET THE FIRST LETTER AND SETS IT TO 'toUpperCase()' - THEN WE USE slice(1) TO GET THE REST OF THE VALUE AND SETS IT TO 'toLowerCase()'
		const fornavn_upper = fornavn.charAt(0).toUpperCase() + fornavn.slice(1).toLowerCase();
		const efternavn_upper = efternavn.charAt(0).toUpperCase() + efternavn.slice(1).toLowerCase();

		// HERE WE WRITE WHAT WE WANT TO DISPLAY INSIDE THE LABEL
		msg.innerHTML =
				"<h2 class='display-4 text-center'>" + fornavn_upper + " " + efternavn_upper + "</h2>" +

				"<table class='table'>" +
					"<thead>" +
						"<tr>" +
							"<th scope='col' class='text-center'> Region </th>" +
							"<th scope='col' class='text-center'> Løn </th>" +
							"<th scope='col' class='text-center'> Skatteprocent </th>" +
							"<th scope='col' class='text-center'> Udbetaling </th>" +
							"<th scope='col' class='text-center'> Betalt skat </th>" +
						"</tr>" +
					"</thead>" +

					"<tbody>" +
						"<tr>" +
							"<td scope='row' class='text-center'>" + region + "</td>"+
							"<td class='text-center'>" + lon + ",-</td>"+
							"<td class='text-center'>" + skat + "%</td>"+
							"<td class='text-center'>" + foer_skat + ",-</td>"+
							"<td class='text-center'>" + skatte_penge + ",-</td>"+
						"</tr>"+
					"</tbody>" +
				"</table>" +
				"<span class='space'>&nbsp;</span>";

		// HERE WE RESET THE INPUTS SO THEY'RE EMPTY WHEN SOMEONE CLICK THE BUTTON
		document.querySelector("#fornavn").value = "";
		document.querySelector("#efternavn").value = "";
		document.querySelector("#lon").value = "";
		document.querySelector("#region").value = "Vælg Region";			
	}
	
	else {
		// IF YOU SUBMIT AND GET RESULTS, AND THEN AFTERWARDS CHANGE SOME VALUES - THEN IT CHECKS FOR VALIDATION AGAIN AND HIDE IT IF THERE'S AN ERROR
		msg.style.display = "none";
	}
}

