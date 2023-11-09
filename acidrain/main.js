title = "Acid Rain";

description = `
[TAP] Switch

`;

characters = [

`
   ll
   l  
lbbbb
 rp  l
r  r
    r
`
,
 ];

const G = {
	WIDTH: 70,
	HEIGHT: 100,
  raindrops_SPEED_MIN: 0.5,
	raindrops_SPEED_MAX: 1.0
};

options = {
  viewSize: {x: G.WIDTH, y: G.HEIGHT}
};

/**
* @typedef {{
  * pos: Vector,
  * speed: number
  * }} Raindrop
  */
  
  /**
  * @type  { Raindrop [] }
  */
  let raindrops;


// The game loop function
function update() {
  // The init function running at startup
      if (!ticks) {
              raindrops = times(6, () => {
                // Random number generator function
                // rnd( min, max )
              const posX = rnd(0, G.WIDTH);
              const posY = rnd(0, G.HEIGHT);
                // An object of type raindrop with appropriate properties
              return {
                  // Creates a Vector
                    pos: vec(posX, posY),
                    // More RNG
                    speed: rnd(G.raindrops_SPEED_MIN, G.raindrops_SPEED_MAX)
              };
          });
      } //end of if !ticks
      // Update for raindrop
      raindrops.forEach((r) => {
        // Move the raindrop downwards
        r.pos.y += r.speed;
        // Bring the raindrop back to top once it's past the bottom of the screen
        r.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);

        // Choose a color to draw
        color("blue");
        // Draw the raindrop as a square of size 1
        box(r.pos, 1.3);
      });
}

