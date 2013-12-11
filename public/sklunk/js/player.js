var canvas, stage, exportRoot, images, lib;
var CLO = {"content":[],"animations":{}};
function loadActivity() {
	canvas = document.getElementById("canvas");
	canvas.setAttribute("height","500px");
	canvas.setAttribute("width","790px");
	images = images||{};

	var animationScriptLoader = new createjs.LoadQueue();
	animationScriptLoader.installPlugin(createjs.Sound);
	animationScriptLoader.installPlugin(createjs.WebAudioPlugin);

	//READ IN THE FOLLOWING ARRAY FROM THE BISCUIT (can be disassociated, but put into an array, any order)
	var anims = ["x3_correct_sklunk_bball.js", "x3_incorrect_sklunk_bball.js","Lip_Sync_Test.js"];
	for(var i=0;i<anims.length;i++){
	  var nm = (anims[i]).substring(0,(anims[i]).lastIndexOf("."));
		var _data = {src:anims[i],type:createjs.LoadQueue.JAVASCRIPT,id:nm}; //build the loadManifest manifest objects
		CLO.content.push(_data);
	}
	animationScriptLoader.loadManifest(CLO.content, true); //pull script files into "floating" <script> blocks
	animationScriptLoader.addEventListener("error", handleScriptError);
	animationScriptLoader.addEventListener("fileload", handleScriptLoad);
	animationScriptLoader.addEventListener("complete", preloadScriptAssets);
	//animationScriptLoader.loadManifest(lib.properties.manifest);
}

function handleScriptError(evt){
	console.log("Script could not load");
	console.log(evt);
}

function handleScriptLoad(evt) {
	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
	if (evt.item.type == "javascript") {
		//save non-DOM <script> block into obj
		CLO.animations[evt.item.id]=evt.result;
		//(document.getElementByTagName("HEAD")[0]).addChild(evt.result)
	}
}

function preloadScriptAssets(evt) {
	//TODO: Should we use a document fragment? 
	for (var i in CLO.animations){
		//make non-DOM <script> block part of the DOM
		document.body.appendChild(CLO.animations[i]);
		//clone and preserve lib JS object over the non-DOM <script> block
		CLO.animations[i] = $.extend({}, lib);
	}

	var assetLoader = new createjs.LoadQueue();
	assetLoader.setMaxConnections(20);
	assetLoader.maintainScriptOrder = false;
	assetLoader.installPlugin(createjs.Sound); //TODO: This necessary?
	assetLoader.addEventListener("error", handleScriptError);
	assetLoader.addEventListener("fileload", handleAssetLoad);
	assetLoader.addEventListener("complete", handleManifestComplete);
	var masterManifest = [{src:"sounds/silence_shim.mp3", id:"silence_shim"}]; //Fixes iOS audio issue
	for (var i in CLO.animations){
		//build manifest file that requests all assets from all the PSGs animations
		$.merge(masterManifest, (CLO.animations[i]).properties.manifest);
	}
	//Get the unique assets
	assetLoader.loadManifest(removeDuplicateAssets(masterManifest));
}

/**
* Removes duplicate objects from an array
*/
function removeDuplicateAssets(arr){
	var existingIDs = [];
	arr = $.grep(arr, function(v) {
		if ($.inArray(v.id, existingIDs) !== -1) {
		    return false;
		}else {
		    existingIDs.push(v.id);
		    return true;
		}
	});
	return arr;
}

function handleAssetLoad(evt) {	
	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
}

function handleManifestComplete() {
	stage = new createjs.Stage(canvas);
	$("#question").show().animate({top:"+=778px"},1000);
}

function animationDone(){
	$("#animation").hide();
}

function playAnimation(ind) {
	if(stage){
		playSound("silence_shim"); //REQUIRED: fixed iOS audio bug
		//CLO.content[ind]["id"] is a MovieClip object
		var animation = new lib[CLO.content[ind]["id"]](null, 0, false); //The "false" prevents looping on the MovieClip() function
		console.log(animation);
		animation.timeline.addTween(createjs.Tween.get(this).wait(animation.timeline.duration).call(animationDone));
		//Show the animation
		$("#animation").show();
		//Clear the previous MovieClip from canvas
		stage.removeAllChildren();
		//Load the new MovieClip into the stage
		stage.addChild(animation);
		//Play the animation
		stage.update();
		//stage.addEventListener("drawend", function(){alert("all done");});

		createjs.Ticker.setFPS(lib.properties.fps);
		createjs.Ticker.addEventListener("tick", stage);
	}
}

function playSound(id, loop) {
	createjs.Sound.play(id, createjs.Sound.INTERRUPT_EARLY, 0, 0, loop);
}