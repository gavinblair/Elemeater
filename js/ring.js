function getPosOfSnake(index)
	{
		/*
			Snakes positioned on a circle. 0-index at 12 o'clock
		*/

		var radius:int = RING_RADIUS;
		var numElements:int = SNAKES_IN_RING;
		var angle:Number = (Math.PI * 2.0) / numElements;

		// Whee! Highschool trig.

		var centerX:Number = radius * Math.cos(angle * index);
		var centerY:Number = radius * Math.sin(angle * index);

		return { x:0, y:0 };
	}
