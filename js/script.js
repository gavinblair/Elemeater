/* Author: 

*/

$(document).ready(function(){

	$("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH});
	
	//define animations
	
	//big tail
	var bigtail = new $.gameQuery.Animation({ 
		imageURL: "img/bigtail.png",
		numberOfFrame: 1,
		delta: 100,
		rate: 1,
		type: $.gameQuery.ANIMATION_VERTICAL
	});
	
	//big head
	var bighead = new $.gameQuery.Animation({ 
		imageURL: "img/bighead.png",
		numberOfFrame: 1,
		delta: 100,
		rate: 1,
		type: $.gameQuery.ANIMATION_VERTICAL
	});
	
	//big body
	var bigbody = new $.gameQuery.Animation({ 
		imageURL: "img/bigbody.png",
		numberOfFrame: 1,
		delta: 100,
		rate: 1,
		type: $.gameQuery.ANIMATION_VERTICAL
	});
	
	//double snake
	var doublesnake = new $.gameQuery.Animation({ 
		imageURL: "img/doubles.png",
		numberOfFrame: 1,
		delta: 100,
		rate: 1,
		type: $.gameQuery.ANIMATION_HORIZONTAL
	});
	//offsety*100 will be a different snake
	
	var watersnake = new $.gameQuery.Animation({ 
		imageURL: "img/singles.png",
		numberOfFrame: 4,
		delta: 70,
		rate: 150,
		offsety: 0*41,
		type: $.gameQuery.ANIMATION_HORIZONTAL
	});
	var firesnake = new $.gameQuery.Animation({ 
		imageURL: "img/singles.png",
		numberOfFrame: 4,
		delta: 70,
		rate: 150,
		offsety: 1*41,
		type: $.gameQuery.ANIMATION_HORIZONTAL
	});
	var earthsnake = new $.gameQuery.Animation({ 
		imageURL: "img/singles.png",
		numberOfFrame: 4,
		delta: 70,
		rate: 150,
		offsety: 2*41,
		type: $.gameQuery.ANIMATION_HORIZONTAL
	});
	
	//exploding snake
	
	//add the ring group
	$.playground().addGroup("ring", {
		width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT
	});
	
	
	$.playground().startGame(function() { });
	
	var tiles = new Array();
	
	var rotationAngle = 360 / SNAKES_IN_RING;
	
	for(var i  = 0; i <= SNAKES_IN_RING; i++) {
		var pos = getPosOfSnake(i);
		$("#ring").addGroup("tile"+i, { height: 100, width: 100});	
		//center the tile
		$("#tile"+i).css("top", (300+pos.x)+"px").css("left", (300+pos.y)+"px");
		//now move it based on pos.y and pos.x
		if(i == 0) {
			//big tail
			$("#tile"+i).addSprite("snake"+i, {animation: bigtail, width: 100, height: 100});
		} else if (i == 1) {
			//big head
			$("#tile"+i).addSprite("snake"+i, {animation: bighead, width: 100, height: 100});
		} else {
			//random tile
			var snaketype = Math.floor(Math.random()*8);
			//we'll probably want to be able to weight it - single snakes should be more probably than double snakes
			
			var thesnake = null;
			var h;
			var w;
			switch(snaketype) {
				case 0:
					thesnake = watersnake;
					h = 41;
					w = 70;
					break;
				case 1:
					thesnake = firesnake;
					h = 41;
					w = 70;
					break;
				case 2:
					thesnake = earthsnake;
					h = 41;
					w = 70;
					break;
				
			}
			$("#tile"+i).addSprite("snake"+i, {animation: thesnake, width: w, height: h});
			$("#tile"+i).attr("rel", i).addClass("tile");
			
			$("#tile"+i+" .sprite").rotate(rotationAngle * i * -1);
		}
		
		
		
	}
	
	$(".tile").click(function(){
				alert($(this).attr("rel"));
				$(this).hide();
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
























