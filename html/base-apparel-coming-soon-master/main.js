

function checkInputEmail(){
	document.getElementById("outputText").className = "fontSizeMed redText";
	document.getElementById("outputText").innerHTML  = "Please provide a valid email"
	
	var emailInput = document.getElementById('inputText').value;
	document.getElementById("inputText").className = "fontSizeMed inputError";
	const mediaQuery = window.matchMedia('(min-width: 600px)')

	var partEmail = emailInput.split('@')
	if( partEmail.length  == 2)
	{	if( partEmail[1].split('.').length >=2 )
		{	document.getElementById("outputText").className = "fontSizeMed blueText";
			if (mediaQuery.matches) 
			{	document.getElementById("outputText").innerHTML  = "Your email has been added, Thanks for Join us!";	}
			else
			{	document.getElementById("outputText").innerHTML  = "Your email has been added,<br>Thanks for Join us!";	}
			document.getElementById("inputText").className = "fontSizeMed inputNormal";
		}
	}

} 