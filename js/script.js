/* Author: 

*/

$(document).ready(function(){

	$("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH});
	
	var tiles = new Array();
	
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
});






















