var sounds		= {}
sounds.onLoadFcts	= []



//////////////////////////////////////////////////////////////////////////////////
//		init sounds							//
//////////////////////////////////////////////////////////////////////////////////
;(function(){
	// init context
	var AudioContext	= window.AudioContext || window.webkitAudioContext;
	var context		= new AudioContext()
	
	// init masterOut
	var masterOut	= context.destination

	// masterOut to support muteWithVisibility
	;(function(){
		var gainNode	= context.createGain()
		gainNode.connect(masterOut)			
		muteWithVisibility(gainNode)
		masterOut	= gainNode
	})()

	// masterOut to support sounds.toggleMute() and sounds.isMuted
	;(function(){
		var gainNode	= context.createGain()
		gainNode.connect(masterOut)
		masterOut	= gainNode
		sounds.isMuted	= false
		sounds.toggeMute= function(){
			sounds.isMuted	= sounds.isMuted ? false : true;
			gainNode.gain.value	= sounds.isMuted ? 0 : 1;
		}
	})()

	//  to support sounds.volume
	;(function(){
		var gainNode	= context.createGain()
		gainNode.connect( masterOut )	
		masterOut	= gainNode
		Object.defineProperty(sounds, 'volume', {
			get : function(){
				return gainNode.gain.value; 
			},
                        set : function(value){
                        	gainNode.gain.value	= value;
			}
		});
	})()

	Object.defineProperty(sounds, 'masterOut', { get : function(){
		return masterOut; 
	}});
	Object.defineProperty(sounds, 'context'	 , { get : function(){
		return context; 
	}});

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	
	sounds.loadBuffer	= loadBuffer
	return;


	//////////////////////////////////////////////////////////////////////////////////
	//		loadBuffer Helper						//
	//////////////////////////////////////////////////////////////////////////////////
	/**
	 * Helper to load a buffer
	 * @param  {String} url     the url of the sound to load
	 * @param  {Function} onLoad  callback to notify when the buffer is loaded and decoded
	 * @param  {Function} onError callback to notify when an error occured
	 */
	function loadBuffer(url, onLoad, onError){
		var request	= new XMLHttpRequest()
		request.open('GET', url, true)
		request.responseType	= 'arraybuffer'
		request.onload	= function(){
			context.decodeAudioData(request.response, function(buffer){
				// notify the callback
				onLoad && onLoad(buffer)
				// to support sounds.onLoadFcts	if needed				
				sounds.onLoadFcts && sounds.onLoadFcts.forEach(function(onLoadFct){
					onLoadFct()
				})
			}, function(){
				onError && onError()
			})
		}
		request.send()
	}	
	
	//////////////////////////////////////////////////////////////////////////////////
	//		muteWithVisibility helper					//
	//////////////////////////////////////////////////////////////////////////////////
	/**
	 * mute a gainNode when the page isnt visible
	 * @param  {Node} gainNode the gainNode to mute/unmute
	 */
	function muteWithVisibility(gainNode){
		// shim to handle browser vendor
		var eventStr	= (document.hidden !== undefined	? 'visibilitychange'	:
			(document.mozHidden	!== undefined		? 'mozvisibilitychange'	:
			(document.msHidden	!== undefined		? 'msvisibilitychange'	:
			(document.webkitHidden	!== undefined		? 'webkitvisibilitychange' :
			console.assert(false, "Page Visibility API unsupported")
		))));
		var documentStr	= (document.hidden !== undefined ? 'hidden' :
			(document.mozHidden	!== undefined ? 'mozHidden' :
			(document.msHidden	!== undefined ? 'msHidden' :
			(document.webkitHidden	!== undefined ? 'webkitHidden' :
			console.assert(false, "Page Visibility API unsupported")
		))));
		// event handler for visibilitychange event
		var callback	= function(){
			var isHidden	= document[documentStr] ? true : false
			gainNode.gain.value	= isHidden ? 0 : 1
		}.bind(this)
		// bind the event itself
		document.addEventListener(eventStr, callback, false)
		// destructor
		this.destroy	= function(){
			document.removeEventListener(eventStr, callback, false)
		}
	}
	
})()
