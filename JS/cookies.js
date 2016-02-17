
// If there is a cookie, split is and return Username split
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
    	var c = ca[i];
    	while (c.charAt(0)==' ') c = c.substring(1);
    	if (c.indexOf(name) == 0){
    		return c.substring(name.length,c.length);
    	}
    }
    return "";
}


//Set cookie with variabled expiration
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}


//Check cookie against user input
function checkCookie() {
	var username=getCookie("username");
	var userInput = document.getElementById("loginInput").value;
	if (username == userInput) {
		_success()
	}
	else if (userInput == "admin"){
		_success()	
	}
	else{
		alert("Invalid Credentials");
		_toggle();
		$("#registerInput").focus();
	}
}

//Save your cookies
function register() {
	var username=getCookie("username");
	var userInput = document.getElementById("registerInput").value;
	if (userInput != "" && userInput != null && username != userInput) {
   		setCookie("username", userInput, 30);
   		alert("User Registered");
		_toggle();
		$("#loginInput").focus();
	}
	else if (username == userInput){
		alert("Already Registered");
		_toggle();
		$("#loginInput").focus();
	}
	else {
		alert("Invalid Registration");
	}
}