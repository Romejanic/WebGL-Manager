var webgl = {
	activeContexts: [],
	primaryContext: null,
	settings: {
		canvasID: "webgl-canvas",
		openLinksInNewTab: true,
		showCanvasErrorAlerts: true
	}
};

webgl.openLink = function(url){
	window.open(url, this.settings.openLinksInNewTab ? "_blank" : "_self");
};

webgl.createContext = function() {
	var canvas = document.getElementById(webgl.settings.canvasID);
	if(!canvas) {
		// If there is no canvas with the id, just use the first canvas in the DOM
		canvas = document.querySelector("canvas");
		if(!canvas) {
			console.error("WebGL compatible canvas cannot be found in DOM! Add one!");
			return null;
		}
		console.warn("Canvas with ID " + webgl.settings.canvasID + " not found, using " + canvas);
	}
	var version = canvas.getAttribute("webgl-version");
	var contextName = "webgl";
	if(version && version === "2") {
		contextName = "webgl2";
	}
	var ctx = canvas.getContext(contextName);
	if(!ctx) {
		ctx = canvas.getContext("experimental-" + contextName);
		if(ctx) {
			console.warn("Core WebGL context couldn't be found, falling back on experimental...");
		}
	}
	if(!ctx) {
		console.error("WebGL context (" + contextName + ") not found! Your browser may not be compatible!");
		if(webgl.settings.showCanvasErrorAlerts) {
			if(confirm("WebGL Manager: The WebGL context could not be created!\n\nYour browser may be incompatible with WebGL.\nWould you like to install it now?")) {
				webgl.openLink("http://get.webgl.org/");
			}
		}
		return null;
	}
	// Declare new functions in context and add it to list
	if(ctx) {
		ctx.isWebGL2 = version && version === "2";
		ctx.makePrimary = function(){
			webgl.primaryContext = this;
		};
		if(!webgl.primaryContext) {
			ctx.makePrimary();
		}
		webgl.activeContexts.push(ctx);
	}
	return ctx;
};