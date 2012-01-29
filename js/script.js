/* Author: 

*/

var snakeToSwap = -1;
var ringTiles = new Array();

var glows = {
	'single' : new $.gameQuery.Animation({
		imageURL: 'img/glow_single.png',
		numberOfFrame: 1,
		delta: 100,
		rate: 0,
		offsety: 0,
		type: $.gameQuery.ANIMATION_VERTICAL
	}),
	'doubleright' : new $.gameQuery.Animation({
		imageURL: 'img/glow_doubleright.png',
		numberOfFrame: 1,
		delta: 100,
		rate: 0,
		offsety: 0,
		type: $.gameQuery.ANIMATION_VERTICAL
	}),
	'doubleleft' : new $.gameQuery.Animation({
		imageURL: 'img/glow_doubleleft.png',
		numberOfFrame: 1,
		delta: 100,
		rate: 0,
		offsety: 0,
		type: $.gameQuery.ANIMATION_VERTICAL
	}),
	'doubleboth' : new $.gameQuery.Animation({
		imageURL: 'img/glow_double.png',
		numberOfFrame: 1,
		delta: 100,
		rate: 0,
		offsety: 0,
		type: $.gameQuery.ANIMATION_VERTICAL
	}),
}
var shadows = {
	'tail' : new $.gameQuery.Animation({
		imageURL: 'img/shadow_tail.png',
		numberOfFrame: 1,
		delta: 100,
		rate: 0,
		offsety: 0,
		type: $.gameQuery.ANIMATION_VERTICAL
	}),
	'head' : new $.gameQuery.Animation({
		imageURL: 'img/shadow_head.png',
		numberOfFrame: 1,
		delta: 100,
		rate: 0,
		offsety: 0,
		type: $.gameQuery.ANIMATION_VERTICAL
	}),
	'body' : new $.gameQuery.Animation({
		imageURL: 'img/shadow_body.png',
		numberOfFrame: 1,
		delta: 100,
		rate: 0,
		offsety: 0,
		type: $.gameQuery.ANIMATION_VERTICAL
	}),
	'single' : new $.gameQuery.Animation({
		imageURL: 'img/shadow_single.png',
		numberOfFrame: 1,
		delta: 100,
		rate: 0,
		offsety: 0,
		type: $.gameQuery.ANIMATION_VERTICAL
	}),
	'double' : new $.gameQuery.Animation({
		imageURL: 'img/shadow_double.png',
		numberOfFrame: 1,
		delta: 100,
		rate: 0,
		offsety: 0,
		type: $.gameQuery.ANIMATION_VERTICAL
	})
}
var explosion = new $.gameQuery.Animation({
	imageURL: 'img/splosion.png',
	numberOfFrame: 8,
	delta: 100,
	rate: 100,
	type: $.gameQuery.ANIMATION_VERTICAL | $.gameQuery.ANIMATION_ONCE
});
var snakeanimations = {
	'bigtail' : new $.gameQuery.Animation({ 
		imageURL: "img/bigtail.png",
		numberOfFrame: 1,
		delta: 100,
		rate: 0,
		type: $.gameQuery.ANIMATION_VERTICAL
	}),
	'bighead' : new $.gameQuery.Animation({ 
		imageURL: "img/bighead.png",
		numberOfFrame: 1,
		delta: 100,
		rate: 0,
		type: $.gameQuery.ANIMATION_VERTICAL
	}),
	'bigbody' : new $.gameQuery.Animation({ 
		imageURL: "img/bigbody.png",
		numberOfFrame: 1,
		delta: 100,
		rate: 0,
		type: $.gameQuery.ANIMATION_VERTICAL
	}),
	'earth' : new $.gameQuery.Animation({ 
		imageURL: "img/snakes.png",
		numberOfFrame: 1,
		delta: 100,
		rate: 0,
		offsety: 0*100,
		type: $.gameQuery.ANIMATION_HORIZONTAL
	}),
	'earthearth' : new $.gameQuery.Animation({ 
		imageURL: "img/snakes.png",
		numberOfFrame: 1,
		delta: 100,
		rate: 0,
		offsety: 1*100,
		type: $.gameQuery.ANIMATION_HORIZONTAL
	}),
	'earthwater' : new $.gameQuery.Animation({ 
		imageURL: "img/snakes.png",
		numberOfFrame: 1,
		delta: 100,
		rate: 0,
		offsety: 2*100,
		type: $.gameQuery.ANIMATION_HORIZONTAL
	}),
	'fire' : new $.gameQuery.Animation({ 
		imageURL: "img/snakes.png",
		numberOfFrame: 1,
		delta: 100,
		rate: 0,
		offsety: 3*100,
		type: $.gameQuery.ANIMATION_HORIZONTAL
	}),
	'earthfire' : new $.gameQuery.Animation({ 
		imageURL: "img/snakes.png",
		numberOfFrame: 1,
		delta: 100,
		rate: 0,
		offsety: 4*100,
		type: $.gameQuery.ANIMATION_HORIZONTAL
	}),
	'firefire' : new $.gameQuery.Animation({ 
		imageURL: "img/snakes.png",
		numberOfFrame: 1,
		delta: 100,
		rate: 0,
		offsety: 5*100,
		type: $.gameQuery.ANIMATION_HORIZONTAL
	}),
	'water' : new $.gameQuery.Animation({ 
		imageURL: "img/snakes.png",
		numberOfFrame: 1,
		delta: 100,
		rate: 0,
		offsety: 6*100,
		type: $.gameQuery.ANIMATION_HORIZONTAL
	}),
	'waterfire' : new $.gameQuery.Animation({ 
		imageURL: "img/snakes.png",
		numberOfFrame: 1,
		delta: 100,
		rate: 0,
		offsety: 7*100,
		type: $.gameQuery.ANIMATION_HORIZONTAL
	}),
	'waterwater' : new $.gameQuery.Animation({ 
		imageURL: "img/snakes.png",
		numberOfFrame: 1,
		delta: 100,
		rate: 0,
		offsety: 8*100,
		type: $.gameQuery.ANIMATION_HORIZONTAL
	}),
};


function setSnakeRotation(idx)
{
	var rotationAngle = 360 / SNAKES_IN_RING;
	var rot = rotationAngle * idx * -1;
	var snake = $("#tile"+idx+" .sprite");
	
	if (ringTiles[idx].flippedVisual) {
		rot+=180;
	}
	rot-=15;
	snake.css("transform", "rotate("+rot+"deg)");
	snake.css("-ms-transform", "rotate("+rot+"deg)"); /* IE 9 */
	snake.css("-moz-transform", "rotate("+rot+"deg)"); /* Firefox */
	snake.css("-webkit-transform", "rotate("+rot+"deg)"); /* Safari and Chrome */
	snake.css("-o-transform", "rotate("+rot+"deg)"); /* Opera */
			
}

function setSnakeScaledRotation(idx, scalar)
{
	var rotationAngle = 360 / SNAKES_IN_RING;
	var rot = rotationAngle * idx * -1;
	var snake = $("#tile"+idx+" .sprite");

	if (ringTiles[idx].flippedVisual) {
		rot+=180;
	}
	rot-=15;
	snake.css("transform", "rotate("+rot+"deg) scale("+scalar+", "+scalar+")");
	snake.css("-ms-transform", "rotate("+rot+"deg) scale("+scalar+", "+scalar+")"); /* IE 9 */
	snake.css("-moz-transform", "rotate("+rot+"deg) scale("+scalar+", "+scalar+")"); /* Firefox */
	snake.css("-webkit-transform", "rotate("+rot+"deg) scale("+scalar+", "+scalar+")"); /* Safari and Chrome */
	snake.css("-o-transform", "rotate("+rot+"deg) scale("+scalar+", "+scalar+")"); /* Opera */
}

// first time
function BuildRing()
{
	for(var i  = 0; i < SNAKES_IN_RING; i++) {
		var leftType = EMPTY;
		var rightType = EMPTY;

		/* the TAIL always starts at position N and the HEAD always starts at position 0 */
		if(i == SNAKES_IN_RING-1) {
			leftType = rightType = TAIL;
		} else if (i == 0) {
			leftType = rightType = HEAD;
		}
		
		while (leftType == EMPTY && rightType == EMPTY)
		{
			var chance = Math.random();
			if(chance <= 0.30) {
				leftType = Math.floor(Math.random()*3 + 1);
				rightType = EMPTY;
			} else if(chance <= 0.60) {
				leftType = EMPTY;
				rightType = Math.floor(Math.random()*3 + 1);
			} else {
				leftType = Math.floor(Math.random()*3 + 1);
				rightType = Math.floor(Math.random()*3 + 1);
			}
		}

		ringTiles.push({left:leftType, right:rightType, flippedLogic:false, flippedVisual:false});
	}
}

function Snake(left, right)
{
	return left + 10*right;
}

function IsOroPiece(idx)
{
	return ((ringTiles[idx].left == EMPTY && ringTiles[idx].right == EMPTY) ||
			(ringTiles[idx].left == HEAD && ringTiles[idx].right == HEAD) ||
			(ringTiles[idx].left == TAIL && ringTiles[idx].right == TAIL));
}

// clean up EMPTIES
function BalanceRing()
{
	var newRingTiles = new Array;
	for (var i = 0; i < ringTiles.length; ++i) {
		if (!IsOroPiece(i)) {
			newRingTiles.push(ringTiles[i]);
		}
	}

	var missingTiles = SNAKES_IN_RING - newRingTiles.length;
	var tailTiles = Math.floor(missingTiles / 2);
	var headTiles = missingTiles - tailTiles;

	newRingTiles.push({left:TAIL, right:TAIL});
	for (var i = 0; i < tailTiles - 1; ++i) {
		newRingTiles.push({left:EMPTY, right:EMPTY});
	}

	newRingTiles.splice(0,0,{left:HEAD, right:HEAD});
	for (var i = 0; i < headTiles - 1; ++i) {
		newRingTiles.splice(0,0,{left:EMPTY, right:EMPTY});
	}

	ringTiles = newRingTiles;
}

function tilename(idx)
{
	var tilenames = ["tail", "body", "head", "empty", "water", "earth", "fire"];
	return tilenames[idx+3];
}

function tile2logic(tile)
{
	if (tile.flippedLogic) {
		return {left:tile.right, right:tile.left};
	} else {
		return tile;
	}
}

function IsMatch(center)
{
	var prev = tile2logic(ringTiles[center-1]);
	var cur = tile2logic(ringTiles[center]);
	var next = tile2logic(ringTiles[center+1]);

	var matchWithPrev = false;
	var matchWithNext = false;

	if (cur.right == EMPTY || cur.right == prev.left || IsOroPiece(center-1)) matchWithPrev = true;

	if (cur.left == EMPTY || cur.left == next.right || IsOroPiece(center+1)) matchWithNext = true;
	
	return (matchWithPrev && matchWithNext);
}

function MarkMatches()
{
	for(var i  = 1; i < SNAKES_IN_RING-1; i++) {
		ringTiles[i].matched = IsMatch(i);
	
		var vTile = tile2logic(ringTiles[i]);

		$("#snake" + i).append("<div style='color: white;'>["+i+"] L:"+vTile.left+" .. R:"+vTile.right+"</div>");
		if (ringTiles[i].flippedLogic)
			$("#snake" + i).append("<div style='color: white;'>FLIPPED</div>");
		if (ringTiles[i].matched)
			$("#snake" + i).append("<div style='color: white;'>MATCH</div>");
	}
}

function ConsumeMatches()
{
	MarkMatches();

	for(var i  = 0; i < SNAKES_IN_RING-1; i++) {
		if (ringTiles[i].matched)
		{
			ringTiles[i].left = EMPTY;
			ringTiles[i].right = EMPTY;
			ringTiles[i].matched = false;
		}
	}
}

function RebuildRing()
{

	//remove all glows
	$(".glow").remove();
	for(var i  = 0; i < SNAKES_IN_RING; i++) {
		var pos = getPosOfSnake(i+(SNAKES_IN_RING/2));
		
		if($("#tile"+i).length == 0) {
			$("#ring").addGroup("tile"+i, { height: 100, width: 100});	
		}
		//center the tile
		//now move it based on pos.y and pos.x
		$("#tile"+i).css("top", (300+pos.x)+"px").css("left", (300+pos.y)+"px");
		
		var leftSnake = ringTiles[i].left;
		var rightSnake = ringTiles[i].right;
		
		var thesnake = null;
		var thetype = null;
		var h = 100;
		var w = 100;
		var left = leftSnake;
		var right = rightSnake;
		var shadow;

		switch (Snake(left, right))
		{
			case Snake(HEAD, HEAD):
				thesnake = snakeanimations.bighead;
				thetype = "ouroborous";
				shadow = shadows.head;
				break;
			case Snake(TAIL, TAIL):
				thesnake = snakeanimations.bigtail;
				thetype = "ouroborous";
				shadow = shadows.tail;
				break;
			case Snake(EMPTY, EMPTY):
				thesnake = snakeanimations.bigbody;
				thetype = "ouroborous";
				shadow = shadows.body;
				break;
			case Snake(EMPTY, WATER):
				// rotate
				ringTiles[i].flippedLogic = true;
			case Snake(WATER, EMPTY):
				thesnake = snakeanimations.water;
				thetype ="water";
				shadow = shadows.single;
				break;
			case Snake(EMPTY, FIRE):
				// rotate
				ringTiles[i].flippedLogic = true;
			case Snake(FIRE, EMPTY):
				thesnake = snakeanimations.fire;
				thetype ="fire";
				shadow = shadows.single;
				break;
			case Snake(EMPTY, EARTH):
				// rotate
				ringTiles[i].flippedLogic = true;
			case Snake(EARTH, EMPTY):
				thesnake = snakeanimations.earth;
				thetype ="earth";
				shadow = shadows.single;
				break;
			case Snake(WATER, WATER):
				thesnake = snakeanimations.waterwater;
				thetype ="waterwater";
				shadow = shadows.double;
				break;
			case Snake(FIRE, FIRE):
				thesnake = snakeanimations.firefire;
				thetype ="firefire";
				shadow = shadows.double;
				break;
			case Snake(EARTH, EARTH):
				thesnake = snakeanimations.earthearth;
				thetype ="earthearth";
				shadow = shadows.double;
				break;
			case Snake(FIRE, EARTH):
				// rotate
				ringTiles[i].flippedLogic = true;
			case Snake(EARTH, FIRE):
				thesnake = snakeanimations.earthfire;
				thetype ="earthfire";
				shadow = shadows.double;
				break;
			case Snake(WATER, EARTH):
				// rotate
				ringTiles[i].flippedLogic = true;
			case Snake(EARTH, WATER):
				thesnake = snakeanimations.earthwater;
				thetype ="earthwater";
				shadow = shadows.double;
				break;
			case Snake(FIRE, WATER):
				// rotate
				ringTiles[i].flippedLogic = true;
			case Snake(WATER, FIRE):
				thesnake = snakeanimations.waterfire;
				thetype ="waterfire";
				shadow = shadows.double;
				break;
		};

		$("#snake"+i).remove();
		$("#tile"+i).addSprite("shadow"+i, {animation: shadow, width: w, height: h});
		$("#shadow"+i).addClass("shadow");
		$("#tile"+i).addSprite("snake"+i, {animation: thesnake, width: w, height: h, class: 'snake'});
		$("#snake"+i).addClass("snake");
		$("#tile"+i).attr("rel", i).addClass("tile").addClass(thetype);
		
		if(thetype == "ouroborous") {
			$("#tile"+i).unbind();
		}

		setSnakeRotation(i);
	}
}

function glowsnake(idx, which){
	//single or double?
	var glow;
	if(ringTiles[idx].left == EMPTY || ringTiles[idx].right == EMPTY) {
		glow = glows.single;
	} else if(ringTiles[idx].left != EMPTY && ringTiles[idx].right != EMPTY) {
		if(which == undefined || which == "right") {
			glow = glows.doubleright;
		} else if(which == "left") {
			glow = glows.doubleleft;
		} else {
			glow = glows.doubleboth;
		}
	}
	$("#tile"+idx).addSprite("glow"+idx, {animation: glow, width: 100, height: 100});
	$("#glow"+idx).addClass("glow");
	setSnakeRotation(idx);
	
}

function explodeTile(idx){
	$("#shadow"+idx).remove();
	$("#glow"+idx).remove();
	$("#snake"+idx).remove();
	$("#explosion").remove();
	$("#tile"+idx).addSprite("explosion",
		{animation: explosion, width: 100, height: 100}
	);
	$("#tile"+idx).setAnimation("explosion");
}

var clicksound;
var transpose;
var colourchange;
var endlevel;
$(document).ready(function(){

	var music = document.createElement('audio');
	music.setAttribute('src', 'ogg/music.ogg');
	music.volume=0.3;
	music.load();
	
	clicksound = document.createElement('audio');
	clicksound.setAttribute('src', 'ogg/click.ogg');
	clicksound.load();
	
	endlevel = document.createElement('audio');
	endlevel.setAttribute('src', 'ogg/endlevel.ogg');
	endlevel.load();
	
	transpose = document.createElement('audio');
	transpose.setAttribute('src', 'ogg/transpose.ogg');
	transpose.load();
	
	colourchange = document.createElement('audio');
	colourchange.setAttribute('src', 'ogg/fwoof.ogg');
	colourchange.load();
	
	$("#playground").append("<img src='img/sound_on.png' id='sound' />");
	
	$("#sound").live("click", function(){
		if($(this).attr("src") == "img/sound_on.png") {
			music.volume = 0;
			music.pause();
			$(this).attr("src", "img/sound_off.png");
		} else {
			music.volume = .3;
			music.play();
			$(this).attr("src", "img/sound_on.png");
		}
	});
	
	$("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH});
	
	//add the ring group
	$.playground().addGroup("ring", {
		width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT
	});
	
	$("#splash").click(function(){
		$.playground().startGame(function() {
			$("#splash").fadeOut('slow');
			endlevel.play();
			setTimeout(function(){
				music.play();
			}, 300);
		});
	});

	BuildRing();
	ConsumeMatches();
	BalanceRing();
	RebuildRing();
MarkMatches();
	
	$(".tile:not(.ouroborous)").click(function(){
		if (snakeToSwap == -1)
		{
			// save it for next click swap
			snakeToSwap = $(this).attr("rel");
			setSnakeScaledRotation(snakeToSwap, 1.3);
			$(".tile.selected").removeClass("selected");
			$(this).addClass("selected");
		}
		else
		{
			var thisIdx = $(this).attr("rel");
			if(thisIdx != snakeToSwap) {
				var tmpTile = ringTiles[Number(thisIdx)];
				ringTiles[Number(thisIdx)] = ringTiles[Number(snakeToSwap)];
				ringTiles[Number(snakeToSwap)] = tmpTile;
				
				setSnakeRotation(thisIdx);
				setSnakeRotation(snakeToSwap);
				
				transpose.play();
			} else {
				ringTiles[Number(snakeToSwap)].flippedLogic = !ringTiles[Number(snakeToSwap)].flippedLogic;
				ringTiles[Number(snakeToSwap)].flippedVisual = !ringTiles[Number(snakeToSwap)].flippedVisual;

				colourchange.play();
				setSnakeRotation(thisIdx);
				setSnakeRotation(snakeToSwap);
			}

			$(".tile.selected").removeClass('.selected');

			ConsumeMatches();
			BalanceRing();
			RebuildRing();
MarkMatches();
			snakeToSwap = -1;
		}
		
		/* debugging code */
		/*ringTiles[$(this).attr('rel')].left = EMPTY;
		ringTiles[$(this).attr('rel')].right = EMPTY;
		RebuildRing();*/
	});

	$(".tile:not(.ouroborous)").hover(
		// in
		function(){
			setSnakeScaledRotation($(this).attr("rel"), 1.1);
		},
		// out
		function(){
			var thisSnake = $(this).attr("rel");
			if (snakeToSwap != thisSnake)
			{
				setSnakeRotation(thisSnake);
			}
		}
	);


	/*
	// this sets the id of the loading bar:
	$().setLoadBar("loadingBar", 400);
	
	//initialize the start button
	$("#startbutton").click(function(){
		$.playground().startGame(function(){
			$("#welcomeScreen").fadeTo(1000,0,function(){$(this).remove();});
		});
	});*/
});

// Function to restart the game:
function restartgame(){
	window.location.reload();
};
























