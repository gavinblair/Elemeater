/* Author: 

*/

var snakeToSwap = -1;
var ringTiles = new Array();

var snakeanimations = {
	'bigtail' : new $.gameQuery.Animation({ 
		imageURL: "img/bigtail.png",
		numberOfFrame: 1,
		delta: 100,
		rate: 1,
		type: $.gameQuery.ANIMATION_VERTICAL
	}),
	'bighead' : new $.gameQuery.Animation({ 
		imageURL: "img/bighead.png",
		numberOfFrame: 1,
		delta: 100,
		rate: 1,
		type: $.gameQuery.ANIMATION_VERTICAL
	}),
	'bigbody' : new $.gameQuery.Animation({ 
		imageURL: "img/bigbody.png",
		numberOfFrame: 1,
		delta: 100,
		rate: 1,
		type: $.gameQuery.ANIMATION_VERTICAL
	}),
	'water' : new $.gameQuery.Animation({ 
		imageURL: "img/singles.png",
		numberOfFrame: 4,
		delta: 70,
		rate: 150+Math.floor(Math.random()*10),
		offsety: 0*41,
		type: $.gameQuery.ANIMATION_HORIZONTAL
	}),
	'fire' : new $.gameQuery.Animation({ 
		imageURL: "img/singles.png",
		numberOfFrame: 4,
		delta: 70,
		rate: 150+Math.floor(Math.random()*10),
		offsety: 1*41,
		type: $.gameQuery.ANIMATION_HORIZONTAL
	}),
	'earth' : new $.gameQuery.Animation({ 
		imageURL: "img/singles.png",
		numberOfFrame: 4,
		delta: 70,
		rate: 150+Math.floor(Math.random()*10),
		offsety: 2*41,
		type: $.gameQuery.ANIMATION_HORIZONTAL
	}),
	'waterwater' : new $.gameQuery.Animation({ 
		imageURL: "img/doubles.png",
		numberOfFrame: 4,
		delta: 100,
		rate: 150+Math.floor(Math.random()*10),
		offsety: 0*56,
		type: $.gameQuery.ANIMATION_HORIZONTAL
	}),
	'waterfire' : new $.gameQuery.Animation({ 
		imageURL: "img/doubles.png",
		numberOfFrame: 4,
		delta: 100,
		rate: 150+Math.floor(Math.random()*10),
		offsety: 1*56,
		type: $.gameQuery.ANIMATION_HORIZONTAL
	}),
	'waterearth' : new $.gameQuery.Animation({ 
		imageURL: "img/doubles.png",
		numberOfFrame: 4,
		delta: 100,
		rate: 150+Math.floor(Math.random()*10),
		offsety: 2*56,
		type: $.gameQuery.ANIMATION_HORIZONTAL
	}),
	'firefire' : new $.gameQuery.Animation({ 
		imageURL: "img/doubles.png",
		numberOfFrame: 4,
		delta: 100,
		rate: 150+Math.floor(Math.random()*10),
		offsety: 3*56,
		type: $.gameQuery.ANIMATION_HORIZONTAL
	}),
	'fireearth' : new $.gameQuery.Animation({ 
		imageURL: "img/doubles.png",
		numberOfFrame: 4,
		delta: 100,
		rate: 150+Math.floor(Math.random()*10),
		offsety: 4*56,
		type: $.gameQuery.ANIMATION_HORIZONTAL
	}),
	'earthearth' : new $.gameQuery.Animation({ 
		imageURL: "img/doubles.png",
		numberOfFrame: 4,
		delta: 100,
		rate: 150+Math.floor(Math.random()*10),
		offsety: 5*56,
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

function setSnakeDoubleSizeRotation(idx)
{
	var rotationAngle = 360 / SNAKES_IN_RING;
	var rot = rotationAngle * idx * -1;
	var snake = $("#tile"+idx+" .sprite");

	snake.css("transform", "rotate("+rot+"deg) scale(2.0, 2.0)");
	snake.css("-ms-transform", "rotate("+rot+"deg) scale(2.0, 2.0)"); /* IE 9 */
	snake.css("-moz-transform", "rotate("+rot+"deg) scale(2.0, 2.0)"); /* Firefox */
	snake.css("-webkit-transform", "rotate("+rot+"deg) scale(2.0, 2.0)"); /* Safari and Chrome */
	snake.css("-o-transform", "rotate("+rot+"deg) scale(2.0, 2.0)"); /* Opera */
}

// first time
function BuildRing()
{
	for(var i  = 0; i < SNAKES_IN_RING; i++) {
		var leftType = 0;
		var rightType = 0;

		while (left == 0 && right == 0)
		{
			leftType = Math.floor(Math.random()*4);
			rightType = Math.floor(Math.random()*4);
		}

		ringTiles.push({left:leftType, right:rightType});
	}
}

function RebuildRing()
{
	for(var i  = 0; i < SNAKES_IN_RING; i++) {
		var pos = getPosOfSnake(i);
		$("#ring").addGroup("tile"+i, { height: 100, width: 100});	
		//center the tile
		$("#tile"+i).css("top", (300+pos.x)+"px").css("left", (300+pos.y)+"px");
		//now move it based on pos.y and pos.x
		if(i == Math.floor(SNAKES_IN_RING/2)) {
			//big tail
			$("#tile"+i).addSprite("snake"+i, {animation: snakeanimations.bigtail, width: 100, height: 100});
		} else if (i == Math.floor(SNAKES_IN_RING/2)+1) {
			//big head
			$("#tile"+i).addSprite("snake"+i, {animation: snakeanimations.bighead, width: 100, height: 100});
		} else {
			//random tile
			var snaketype = Math.floor(Math.random()*8);
			//we'll probably want to be able to weight it - single snakes should be more probably than double snakes
			
			var thesnake = null;
			var h;
			var w;
			var left = '';
			var right = '';
			switch(snaketype) {
				case 0:
					thesnake = snakeanimations.water;
					h = 41;
					w = 70;
					left = WATER;
					right = EMPTY;
					break;
				case 1:
					thesnake = snakeanimations.fire;
					h = 41;
					w = 70;
					left = FIRE;
					right = EMPTY;
					break;
				case 2:
					thesnake = snakeanimations.earth;
					h = 41;
					w = 70;
					left = EARTH;
					right = EMPTY;
					break;
				case 3:
					thesnake = snakeanimations.waterwater;
					h = 56;
					w = 100;
					left = WATER;
					right = WATER;
					break;
				case 4:
					thesnake = snakeanimations.waterfire;
					h = 56;
					w = 100;
					left = WATER;
					right = FIRE;
					break;
				case 5:
					thesnake = snakeanimations.waterearth;
					h = 56;
					w = 100;
					left = WATER;
					right = EARTH;
					break;
				case 6:
					thesnake = snakeanimations.firefire;
					h = 56;
					w = 100;
					left = FIRE;
					right = FIRE;
					break;
				case 7:
					thesnake = snakeanimations.fireearth;
					h = 56;
					w = 100;
					left = FIRE;
					right = EARTH;
					break;
				case 8:
					thesnake = snakeanimations.earthearth;
					h = 56;
					w = 100;
					left = EARTH;
					right = EARTH;
					break;
			}
			$("#tile"+i).addSprite("snake"+i, {animation: thesnake, width: w, height: h});
			$("#tile"+i).attr("rel", i).addClass("tile");

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
	
	$(".tile").click(function(){
		if (snakeToSwap == -1)
		{
			// save it for next click swap
			snakeToSwap = $(this).attr("rel");

			setSnakeDoubleSizeRotation(snakeToSwap);
		}
		else
		{
			var thisIdx = $(this).attr("rel");
			//alert("Swap " + snakeToSwap + " and " + thisIdx);
			
			var tmpTile = ringTiles[Number(thisIdx)];
			ringTiles[Number(thisIdx)] = ringTiles[Number(snakeToSwap)];
			ringTiles[Number(snakeToSwap)] = tmpTile;
			
			setSnakeRotation(thisIdx);
			setSnakeRotation(snakeToSwap);

			RebuildRing();
			snakeToSwap = -1;
		}
	});
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
























