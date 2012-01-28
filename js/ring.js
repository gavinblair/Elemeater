function getPosOfSnake(index)
{
	/*
		Snakes positioned on a circle. 0-index at 12 o'clock
	*/

	var radius = RING_RADIUS;
	var numElements = SNAKES_IN_RING;
	var angle = (Math.PI * 2.0) / numElements;

	// Whee! Highschool trig.

	// centers of tiles are relative to center of ring
	var centerX = radius * Math.cos(angle * index);
	var centerY = radius * Math.sin(angle * index);

	return {
		x:(centerX - RING_RADIUS - SNAKE_RADIUS),
		y:(centerY - RING_RADIUS - SNAKE_RADIUS)
	};
}
