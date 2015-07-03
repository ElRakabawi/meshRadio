( function(){
	var anBar, anBody, visual, hala;



	window.onLoad = function(){
		anBody = document.getElementById('notf-body');
		anBar = document.getElementById('notf-bar');
		visual = document.getElementById('r3')
		hala = anBar.style.display;

		if(halaa == 'block') {
			visual.style.cssText = 'margin-top: 40px;';
			anBody.style.cssText = 'margin-top: 40px';
		}
		else if(hala == 'none') {
			visual.style.cssText = 'margin-top: 0px;';
			anBody.style.cssText = 'margin-top: 0px';
		}
	}
})();

