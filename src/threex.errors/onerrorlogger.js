function OnErrorLogger(){
	// to store the received errors
	var errors	= []
	this.errors	= errors
	// to log the errors
	this.log	= log;
	function log(message, url, line, column, exception){
	console.log('stack', exception.stack)
		// chrome provides column+exception
		// firefox doesn't provide them
		if( column === undefined )	column	= 0
		if( exception === undefined )	exception	= null
		var stack	= exception ? exception.stack : '';
		// build the error to log
		var error	= {
			timeStamp	: Date().toString(),

			message		: message,
			url		: url,
			lineNumber	: line,
	
			column		: column,
			//exception	: exception,	// TODO is that wise ? it may create cycle reference
			stack		: exception ? exception.stack : '',
		}
		// archive it
		errors.push(error)
		// forward to the previous onerror if any
		if( oldOnError !== null )	oldOnError.apply(window, arguments)
	}
	var oldOnError	= null
	/**
	 * start logging
	 */
	this.start	= function(){
		oldOnError	= window.onerror
		window.onerror	= log;
		return this;		
	}
	/**
	 * stop logging
	 */
	this.stop	= function(){
		window.onerror	= oldOnError;
	}

	this.toJSON	= function(){
		return JSON.Stringify(errors)
	}
}
