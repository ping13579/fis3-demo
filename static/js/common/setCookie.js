var setCookie= {
	sendfunction: function (xhr) {
		var username = cookie.get('username');
		var ufenqi_sso = cookie.get('ufenqi_sso');
		// alert(username);
	    if(username && ufenqi_sso){
	        xhr.setRequestHeader('token',username);
	        xhr.setRequestHeader('sessionId',ufenqi_sso);
	    }
	}
}