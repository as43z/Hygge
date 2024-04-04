
// Height (H) and Width (W)
let H, W;
// Are the images downloaded and ready to be shown.
let sketchReady = false;
// Map of shades.
const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";

// A pixel in the grid.
// @param x is the x coordinates of the top-left corner.
// @param y is the y coordinates of the top-left corner.
// @param shade is the shade of the pixel.
class Pixel {
    constructor(x, y, shade) {
        this.x = x;
        this.y = y;
        this.shade = shade;
    }

    // Update the shade of the pixel.
    // @param shade is the new shade of the pixel.
    update(shade) {
        this.shade = shade;
    }

    // Draw the pixel on the grid.
    draw() {
        text(this.shade, this.x, this.y);
    }
}

// A queue that always loops through the array in a circular motion
class CircularQueue {
    constructor() {
        this.size = 0;
        this.items = [];
        this.cursor = 0;
    }

    /**
     * Append an item into the CircularQueue
     * @param {any} item 
     */
    append(item) {
        this.items.push(item);
        this.size++;
    }

    /**
     * Wrapper for append(item) 
     * @param {any} item 
     */
    push(item) {
        this.append(item);
    }

    /**
     * Get the next item in the Queue.
     */
    next() {
        if (this.size == 0) return null;
        let item = this.items[this.cursor];
        this.cursor++;
        if (this.cursor >= this.size) this.cursor = 0;
        return item;
    }
}

// Grid divisions
let grid = [];
// Pixel size
let pixSize;
// The images to render
let images = new CircularQueue();

// Fetch the image from a URL
// @param url, the url to fetch from.
//
// If there is any problem, the function will throw the corresponding
// error.
// If not, it returns the blob loaded from an endpoint.
function fetchImage(url) {
    console.log(`Loading image from ${url}`);
    // Don't forget to return the Promise.
    return fetch(url)
        .then((resp) => {
            return resp.blob();
        })
        .catch((err) => {
            throw Error("AsciiCarrouselTicket: Error while fetching Data.");
        });
}

// If somehow we found an error
function couldNotLoad() {
    background(200);
    textSize(20);
    text('Could Not Load', H/2, W/2);
};

// Normal sketch
function asciiCarousel() {
    for(let i = 0; i < grid.length; i++) {
        text(grid[i].draw());
    }
}

// Loader it executes while the preload is not finished
function loader() {
    if (!sketchReady)
            return;
    runner = asciiCarousel;
}

function mapToAscii() {
    throw Error("AsciiCarouselTicket: Not implemented.");
}

function blobToP5(blob) {
    console.log('AsciiCarouselTicket: blobToP5');
    return blob.arrayBuffer().then(
        (ok) => {
            console.log('AsciiCarouselTicket: blob.arrayBuffer()')
            return 'data:' + blob.type + ';base64,' + btoa(ok);
        }
    );
}

let runner = loader;
function preload() {
    fetchImage("/static/bestDog.jpg").then((blob) => {
            blobToP5(blob).then(
                (ok) => {
                    console.log('AsciiCarouselTicket: blobToP5 resolved.')
                    result = loadImage(ok);
                    images.append(result);
                    sketchReady = true;
                }
            )
        }).catch((err) => {
            runner = couldNotLoad;
    });

}
    
function setup() {
    // Configure sizes
    H = W = 600;
    pixSize = 10;
    textSize(pixSize);
    nrows = W/pixSize;
    crows = H/pixSize;

    for(let i = 0; i < crows; i++) {
        for(let j = 0; j < nrows; j++) {
            grid.push(new Pixel(i*pixSize, j*pixSize, ' '));
        }
    }

    // Embed the canvas into the index.html
    let p5embed = createCanvas(H, W);
    p5embed.parent('p5embed');
}

function draw() {
    runner();
}