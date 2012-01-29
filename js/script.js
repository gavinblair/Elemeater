/* Author: 

*/

var snakeToSwap = -1;
var ringTiles = new Array();

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

		while (leftType == EMPTY && rightType == EMPTY)
		{
			if(Math.random() <= 0.40) {
				leftType = Math.floor(Math.random()*4);
				rightType = EMPTY;
			} else {
				leftType = Math.floor(Math.random()*4);
				rightType = Math.floor(Math.random()*4);
			}
		}

		ringTiles.push({left:leftType, right:rightType});
	}
}

function Snake(left, right)
{
	return left + 10*right;
}

// ring needs to have an even number of empty tiles on front and back of array
//	this is gross.
function RebalanceRing()
{
	var frontCount = 0;
	var backCount = 0;

	while(ringTiles[0].left == EMPTY && ringTiles[0].right == EMPTY)
	{
		ringTiles.shift();
	}

	while(ringTiles[ringTiles.length-1].left == EMPTY && ringTiles[ringTiles.length-1].right == EMPTY)
	{
		ringTiles.pop();
	}

	var numberOfEmpties = SNAKES_IN_RING - ringTiles.length;
	var numberOnBack = numberOfEmpties/2;
	var numberOnFront = numberOfEmpties - numberOnBack;

	for(var i  = 0; i < numberOnBack; i++) {
		ringTiles.push({left:EMPTY, right:EMPTY});
	}
	for(var i  = 0; i < numberOnFront; i++) {
		ringTiles.splice(0, 0, {left:EMPTY, right:EMPTY});
	}
}

function ConsumeMatches()
{
	var matchMade;
	
	do
	{
		matchMade = false;

		for(var i  = 0; i < ringTiles.length-1; i++) {
			var tile = ringTiles[i];
			var nextTile = ringTiles[i+1];

			if (tile.left == EMPTY && tile.right == EMPTY) continue;

			if ((tile.left == WATER && nextTile.right == EARTH) || // WATER erodes EARTH
				(tile.left == EARTH && nextTile.right == FIRE)  || // EARTH buries FIRE
				(tile.left == FIRE && nextTile.right == WATER) // FIRE boils WATER
			)
			{
				nextTile.left = EMPTY;
				nextTile.right = EMPTY;
				matchMade = true;
				ringTiles.splice(i+1, 1);
				break;
			}
		}
	} while (matchMade);

	RebalanceRing();
}

function RebuildRing()
{
	for(var i  = 0; i < SNAKES_IN_RING; i++) {
		var pos = getPosOfSnake(i+(SNAKES_IN_RING/2));
		$("#ring").addGroup("tile"+i, { height: 100, width: 100});	
		//center the tile
		$("#tile"+i).css("top", (300+pos.x)+"px").css("left", (300+pos.y)+"px");
		//now move it based on pos.y and pos.x
		if(i == 0) {
			//big tail
			$("#tile"+i).addSprite("snake"+i, {animation: snakeanimations.bigtail, width: 100, height: 100});
		} else if (i == 1) {
			//big head
			$("#tile"+i).addSprite("snake"+i, {animation: snakeanimations.bighead, width: 100, height: 100});
		} else {
			var leftSnake = ringTiles[i].left;
			var rightSnake = ringTiles[i].right;
			
			var thesnake = null;
			var thetype = null;
			var h = 100;
			var w = 100;
			var left = leftSnake;
			var right = rightSnake;

			switch (Snake(left, right))
			{
				case Snake(EMPTY, WATER):
				case Snake(WATER, EMPTY):
					thesnake = snakeanimations.water;
					thetype ="water";
					break;
				case Snake(EMPTY, FIRE):
				case Snake(FIRE, EMPTY):
					thesnake = snakeanimations.fire;
					thetype ="fire";
					break;
				case Snake(EMPTY, EARTH):
				case Snake(EARTH, EMPTY):
					thesnake = snakeanimations.earth;
					thetype ="earth";
					break;
				case Snake(WATER, WATER):
					thesnake = snakeanimations.waterwater;
					thetype ="waterwater";
					break;
				case Snake(FIRE, FIRE):
					thesnake = snakeanimations.firefire;
					thetype ="firefire";
					break;
				case Snake(EARTH, EARTH):
					thesnake = snakeanimations.earthearth;
					thetype ="earthearth";
					break;
				case Snake(EARTH, FIRE):
				case Snake(FIRE, EARTH):
					thesnake = snakeanimations.earthfire;
					thetype ="earthfire";
					break;
				case Snake(EARTH, WATER):
				case Snake(WATER, EARTH):
					thesnake = snakeanimations.earthwater;
					thetype ="earthwater";
					break;
				case Snake(WATER, FIRE):
				case Snake(FIRE, WATER):
					thesnake = snakeanimations.waterfire;
					thetype ="waterfire";
					break;
			};

			$("#snake"+i).remove();
			$("#tile"+i).addSprite("snake"+i, {animation: thesnake, width: w, height: h});
			$("#tile"+i).attr("rel", i).addClass("tile").addClass(thetype);

			setSnakeRotation(i);
		}
	}
}

$(document).ready(function(){

	$("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH});
	
	//add the ring group
	$.playground().addGroup("ring", {
		width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT
	});
	
	
	$.playground().startGame(function() { });

	BuildRing();
	RebuildRing();
	
	$(".tile").click(function(){
		var thisSnake = $(this).attr("rel");
		if (ringTiles[thisSnake].left == EMPTY && ringTiles[thisSnake].right == EMPTY) return;

		if (snakeToSwap == -1)
		{
			// save it for next click swap
			snakeToSwap = thisSnake;
			setSnakeScaledRotation(snakeToSwap, 1.3);
			$(".tile.selected").removeClass("selected");
			$(this).addClass("selected");
		}
		else
		{
			if(thisSnake != snakeToSwap) {
				var tmpTile = ringTiles[Number(thisSnake)];
				ringTiles[Number(thisSnake)] = ringTiles[Number(snakeToSwap)];
				ringTiles[Number(snakeToSwap)] = tmpTile;
				
				setSnakeRotation(thisSnake);
				setSnakeRotation(snakeToSwap);
			} else {
				$("#snake"+snakeToSwap).css("border", "1px solid red");
			}

			$(".tile.selected").removeClass();
			RebuildRing();
			ConsumeMatches();
			snakeToSwap = -1;
		}
	});

	$(".tile").hover(
		// in
		function(){
			var thisSnake = $(this).attr("rel");
			if (ringTiles[thisSnake].left == EMPTY && ringTiles[thisSnake].right == EMPTY) return;

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
























