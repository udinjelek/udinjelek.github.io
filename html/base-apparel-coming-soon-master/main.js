function checkInputEmail(){
	document.getElementById("outputText").className = "redText";
	document.getElementById("outputText").innerHTML  = "Please provide a valid email"
	
	var emailInput = document.getElementById('inputText').value;
	document.getElementById("inputText").className = "inputError";

	var partEmail = emailInput.split('@')
	if( partEmail.length  == 2)
	{	if( partEmail[1].split('.').length >=2 )
		{	document.getElementById("outputText").className = "blueText";
			document.getElementById("outputText").innerHTML  = "Your email has been added, Thanks for Join us!";
			document.getElementById("inputText").className = "inputNormal";
		}
	}

} 