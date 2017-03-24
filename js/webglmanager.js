var webgl = {}

webgl.activeContext = null;

webgl.createContext = function() {
	var canvas = document.getElementById("webgl-canvas");
	if(!canvas) {
		// If there is no canvas with the id, just use the first canvas in the DOM
		canvas = document.querySelector("canvas");
		console.warn("Canvas with ID webgl-canvas not found, using " + canvas);
	}
	var version = canvas.getAttribute("webgl-version");
	var contextName = "webgl";
	if(version && version === "2") {
		contextName = "webgl2";
	}
	var gl = canvas.getContext(contextName);
	if(!gl) {
		gl = canvas.getContext("experimental-" + contextName);
		if(gl) {
			console.warn("Core WebGL context couldn't be found, falling back on experimental...");
		}
	}
	if(!gl) {
		console.error("WebGL context (" + contextName + ") not found!");
		return null;
	}
	webgl.activeContext = gl;
	return gl;
};