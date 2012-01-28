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
	
	//single snake
	var singlesnake = new $.gameQuery.Animation({ 
		imageURL: "img/singles.png",
		numberOfFrame: 4,
		delta: 70,
		rate: 150,
		offsety: 0,
		type: $.gameQuery.ANIMATION_HORIZONTAL
	});
	//offsety*41 will be a different snake //do we need to multiply this?
	
	//exploding snake
	
	//add the ring group
	$.playground().addGroup("ring", {
		width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT
	});
	$.playground().addSprite("singlesnake", {animation: singlesnake, width: 70, height: 41});
	
	
	
	$.playground().startGame(function() { });
	
	var tiles = new Array();
	/*
	for(var i  = 0; i <= SNAKES_IN_RING; i++) {
		if(i == 0) {
			//big tail
			tiles[i] = new $.gameQuery.Animation({imageURL: "img/bigtail.png"});
		} else if (i == 1) {
			//big head
			tiles[i] = new $.gameQuery.Animation({imageURL: "img/bighead.png"});
		} else {
			//random tile
			var snaketype = Math.floor(Math.random()*8);
			//we'll probably want to be able to weight it - single snakes should be more probably than double snakes
			if(snaketype <= 2) {
				//single snake
				tiles[i] = new $.gameQuery.Animation({imageURL: "img/singles.png"});
			} else {
				//double snake
				tiles[i] = new $.gameQuery.Animation({imageURL: "img/doubles.png"});
			}
		}
		$("#playground").addSprite("tile"+i,{animation: tiles[i]})
		
	}
	
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
























