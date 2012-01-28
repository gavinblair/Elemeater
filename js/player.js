var movesLeft = STARTING_MOVES_LEFT;
var specials = new Array(0,0,0);

var SPECIAL_RECOLOUR = 0;
var SPECIAL_FARSWAP = 1;
var SPECIAL_BITE = 2;

function playerNotifyEat(numItemsEaten)
{
	if (numItemsEaten >= MIN_COUNT_TO_GET_SPECIAL)
	{
		var specialChoice = Math.floor(Math.random() * 3)
		++specials[specialChoice];
	}

	if (numItemsEaten >= MIN_COUNT_TO_GET_EXTRAMOVE)
	{
		movesLeft += 2;		// this move is free, and add another.
	}

	--movesLeft;

	// TODO: call game over function when movesLeft goes to 0
}
