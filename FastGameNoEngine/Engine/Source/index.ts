// Simple type because I hate the '|' operators on classes.
// as well as the '?' operator for type nullability.
type UndefinedOr<N> = N | undefined;

enum AspectRatios {
	THREE_HALVES = "3:2",
	FOUR_THIRDS = "4:3" 
}

function assertNatural(n: number) {
	if ((n <= 0) || (n%1 !== 0))
		throw TypeError(`Engine: ${n} is not a valid natural number.`)
}

/**
 * Object holding the screen dimensions of the window. 
 */
class ScreenDimension {
	/**
	 * Width of the window. In Natural numbers and px.
	 */
	width: number;
	/**
	 * Height of the window. In Natural numbers and px.
	 */
	height: number;

	constructor(height: number, width: number) {
		assertNatural(height);
		assertNatural(width);

		this.width = width;
		this.height = height;
	}
}

class GameResolution {
	aspectRatio: AspectRatios;
	dimensions: ScreenDimension;

	constructor(aspectRatio: AspectRatios, dimensions: ScreenDimension){
		this.aspectRatio = aspectRatio;
		this.dimensions = dimensions;
	}
}

// dimension table
const aspectRatioToDimensions: Map<AspectRatios, Array<ScreenDimension>>= new Map([
	[ AspectRatios.THREE_HALVES, [
		new ScreenDimension(720, 480)	
	]],
]);

interface Context {
	readonly canvas: UndefinedOr<HTMLCanvasElement>;
	gameResolution: GameResolution;
}

// Defer initialisation
let ctx: Context;

/**
 * Initialises the game engine and returns the context for the game. 
 */
function init(options: Context): Context{
	ctx = options;
	console.debug(ctx);
	if (typeof ctx.canvas === 'undefined')
		throw TypeError("Engine: Game Canvas cannot be undefined");

	ctx.canvas.width = ctx.gameResolution.dimensions.width;
	ctx.canvas.height = ctx.gameResolution.dimensions.height;

	ctx.canvas.getContext("2d")!.fillStyle = "gray"	
	return ctx;
}

export default () => {
	// Exports
	return {
		ctx,
		GameResolution,
		ScreenDimension,
		AspectRatios,
		aspectRatioToDimensions,
		init,
	};
}
