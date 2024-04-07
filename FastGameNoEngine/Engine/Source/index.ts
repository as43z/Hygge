
/*
Lib >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/
type NeverUndefined<T> = T extends undefined ? never : T;

function assertNatural(n: number) {
	if ((n <= 0) || (n % 1 !== 0))
		throw TypeError(`Engine: ${n} is not a valid natural number.`)
}

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Lib 
*/

/*
GAME >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
*/
// Game Context >>>>>>>>>>>>>>>>

interface GameContext {
	readonly canvas: HTMLCanvasElement;
	canvasCtx: CanvasRenderingContext2D;
	resolution: GameResolution;
}

// <<<<<<<<<<<<<<<< Game Context 

// Game State >>>>>>>>>>>>>>>>>>

enum GameLogicState {
	INIT,
	RUNNING_SCENE,
	LOADING_TO
}

interface GameState {
	scene: any;
	shouldClose: boolean;
	state: GameLogicState;
}

// <<<<<<<<<<<<<<<< Game State

class Game {
	gameContext: GameContext
	gameState: GameState

	constructor() {}

	init(opts: {
		canvas: NonNullable<HTMLCanvasElement>,
		scene: NonNullable<Scene>
		resolution?: GameResolution,
	}) {

		// Define the resolution by itself.
		if (typeof opts.resolution === 'undefined')
			opts.resolution = new GameResolution(
				AspectRatios.THREE_HALVES,
				aspectRatioToDimensions.get(AspectRatios.THREE_HALVES)![0]
			);

		this.gameContext = {
			canvas: opts.canvas,
			resolution: opts.resolution,
			canvasCtx: opts.canvas.getContext("2d") as NonNullable<CanvasRenderingContext2D>
		}

		this.gameContext.canvas.width = this.gameContext.resolution.dimensions.width;
		this.gameContext.canvas.height = this.gameContext.resolution.dimensions.height;

		this.gameState = {
			scene: opts.scene,
			shouldClose: false,
			state: GameLogicState.INIT
		}

		console.debug(this);
	}

	run() {
		let loop = () => {
			let gameState: GameState = game.gameState;
			let state: GameLogicState = gameState.state;
			if (game.gameState.shouldClose)
				throw Error("GameClosed.");

			switch(state) {
			case GameLogicState.INIT:
				gameState.scene.init();
				game.gameState.state = GameLogicState.LOADING_TO
				break;
			case GameLogicState.RUNNING_SCENE:
				gameState.scene.onUpdate();
				break;
			case GameLogicState.LOADING_TO:
				break;
			default:
				throw Error(`State: ${state} not supported.`)
				break;
			}
			requestAnimationFrame(loop);
		};
		requestAnimationFrame(loop);
	}
}


// Resolution >>>>>>>>>>>>>>>>

class ScreenDimension {
	width: number;
	height: number;

	constructor(width: number, height: number) {
		assertNatural(width);
		assertNatural(height);

		this.height = height;
		this.width = width;
	}
}

enum AspectRatios {
	THREE_HALVES = "3:2",
	FOUR_THIRDS = "4:3" 
}

const windowDimensions: Map<string, ScreenDimension> = new Map([
	["720x480", new ScreenDimension(720, 480)]
])


class GameResolution {
	aspectRatio: AspectRatios;
	dimensions: ScreenDimension;

	constructor(aspectRatio: AspectRatios, dimensions: ScreenDimension) {
		this.aspectRatio = aspectRatio;
		this.dimensions = dimensions;
	}
}

// Dimension table
const aspectRatioToDimensions: Map<AspectRatios, Array<ScreenDimension>> = new Map([
	[AspectRatios.THREE_HALVES, [
		// I hate this operator. Is there a way to circumvent this?
		windowDimensions.get("720x480")! 
	]],
]);

// <<<<<<<<<<<<<<<< Resolution 

class GameObject {
	init() {}
	onUpdate() {}
}

class RenderableGameObject extends GameObject {
	sprite: Sprite;
	
	constructor() {
		super()
	}
	render() {}
}

let game: Game = new Game();

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< GAME 
*/

/*
GRAPHICS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
*/

interface SceneMetadata {
	title?: string
}

class Scene {
	metadata: SceneMetadata;
	gameObjects: Array<any>;

	constructor(metadata: Partial<SceneMetadata>) {
		this.metadata = metadata;
		this.gameObjects = new Array<any>();
	}

	init() { }
	onUpdate() { }
}

class Sprite {
	posX: number;
	posY: number;
	width: number;
	height: number;
}

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< GRAPHICS  
*/


export default {
	// Exports
	GameResolution,
	GameLogicState,
	ScreenDimension,
	AspectRatios,
	Scene,
	game,
	aspectRatioToDimensions,
	windowDimensions,
};
