title = "Space War";

description = `
[TAP] Switch
`;

characters = [
  `
  b  b
  yyyy
  yryr
  yyyy
  b  b
  b  b
  `,
  `
  b  b
  yyyy
  ryry
  yyyy
  b  b
  b  b
  `,
  `
  b  b
  b  b
  yyyy
  yryr
  yyyy
  b  b
  `,
  `
  b  b
  b  b
  yyyy
  ryry
  yyyy
  b  b
  `,
];

const G = {
  WIDTH: 70,
  HEIGHT: 100,
  stars_SPEED_MIN: 0.75,
  stars_SPEED_MAX: 1.0,
  rocks_SPEED_MIN: 0.25,
  rocks_SPEED_MAX: 1.0,
  player_speed: 0.5,
  animationDelay: 20, // Adjust the delay value as needed
};

options = {
  viewSize: { x: G.WIDTH, y: G.HEIGHT },
  theme: "dark",
};

/**
 * @typedef {{
 * pos: Vector,
 * frameIndex: number
 * }} Player
 */

/**
 * @type  { Player }
 */
let player;

/**
 * @typedef {{
 * pos: Vector,
 * speed: number
 * }} star
 */

/**
 * @type  { star [] }
 */
let stars;

/**
 * @typedef {{
* pos: Vector,
* speed: number
* }} rock
*/

/**
* @type  { rock [] }
*/
let rocks;

/**
 * @typedef {{
* pos: Vector,
* speed: number
* }} rockR
*/

/**
* @type  { rock [] }
*/
let rocksR;

let timer;

// Direction variable for the player
let playerDirection = 1; // 1 for right, -1 for left

// Animation frames for the player
const playerFrames = [0, 1, 2, 3];
let playerFrameIndex = 0;

// Counter for animation delay
let animationCounter = 0;

// The game loop function
function update() {
  // The init function running at startup
  if (!ticks) {
    timer = 0;
    stars = times(15, () => {
      const posX = rnd(0, G.WIDTH);
      const posY = rnd(0, G.HEIGHT);
      return {
        pos: vec(posX, posY),
        speed: rnd(G.stars_SPEED_MIN, G.stars_SPEED_MAX),
      };
    });

    rocks = times(2, () => {
      const posX = -1;
      const posY = rnd(0, G.HEIGHT);
      return {
        pos: vec(posX, posY),
        speed: rnd(G.rocks_SPEED_MIN, G.rocks_SPEED_MAX),
      };
    });

    rocksR = times(2, () => {
      const posX = 75;
      const posY = rnd(0, G.HEIGHT);
      return {
        pos: vec(posX, posY),
        speed: rnd(G.rocks_SPEED_MIN, G.rocks_SPEED_MAX),
      };
    });

    player = {
      pos: vec(G.WIDTH * 0.5, 94),
      frameIndex: 0,
    };
  } // end of if !ticks

  timer += 1 / 60;

  if (timer == 1)
  {
    stars = times(15, () => {
      const posX = rnd(0, G.WIDTH);
      const posY = rnd(0, G.HEIGHT);
      return {
        pos: vec(posX, posY),
        speed: rnd(G.stars_SPEED_MIN, G.stars_SPEED_MAX),
      };
    });
  }

  // PLAYER ----------------
  player.pos.y += G.player_speed * playerDirection;
  // When player taps switch direction
  if (input.isJustPressed) {
    playerDirection *= -1;
  }
  // Ensure the player stays within the game boundaries
  player.pos.y = clamp(player.pos.y, 2, 98);
  if(player.pos.y == 2 || player.pos.y == 98)
  {
    playerDirection *= -1;
  }
  // Draw the player
  color("black");

  // Update player animation frame with delay
  if (animationCounter % G.animationDelay === 0) {
    playerFrameIndex = (playerFrameIndex + 1) % playerFrames.length;
  }
  animationCounter++;

  if (playerFrameIndex === 0) {
    char("a", player.pos);
  } else if (playerFrameIndex === 1) {
    char("b", player.pos);
  }
  else if (playerFrameIndex === 2) {
    char("c", player.pos);
  }
  else if (playerFrameIndex === 3) {
    char("d", player.pos);
  }

  // Update for star
  stars.forEach((r) => {
    r.pos.y += r.speed;
    r.pos.wrap(0, G.WIDTH, 0, G.HEIGHT);
    color("black");
    box(r.pos, 1.3);

    if (r.pos.y >= 100)
    {
      r.pos.x = rnd(0, G.WIDTH);
      r.pos.y = -1;
    }
  });

  if(score == 21){

  }

  rocks.forEach((r) => {
    r.pos.x += r.speed;
    color("light_black");
    arc(r.pos, 1.9);
    if(arc(r.pos, 1.9).isColliding.char.a || arc(r.pos, 1.9).isColliding.char.b || arc(r.pos, 1.9).isColliding.char.c || arc(r.pos, 1.9).isColliding.char.d)
    {
      play("explosion");
      end();
    }

    if (r.pos.x >= 80)
    {
      play("coin");
      score += 1;
      r.pos.x = -5;
      r.pos.y = rnd(0, G.HEIGHT);
    }
  });

  rocksR.forEach((r) => {
    r.pos.x -= r.speed;
    color("light_black");
    arc(r.pos, 1.9);
    if(arc(r.pos, 1.9).isColliding.char.a || arc(r.pos, 1.9).isColliding.char.b || arc(r.pos, 1.9).isColliding.char.c || arc(r.pos, 1.9).isColliding.char.d)
    {
      play("explosion");
      end();
    }

    if (r.pos.x <= -5)
    {
      play("coin");
      score += 1;
      r.pos.x = 75;
      r.pos.y = rnd(0, G.HEIGHT);
    }
  });
}
