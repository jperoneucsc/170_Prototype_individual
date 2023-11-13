title = "Acid Rain";

description = `
[TAP] Switch
`;

characters = [
  `
  llll
  llll
   r
  rrr
   ccc
  c
  `,
  `
  llll
  llll
    r
   rrr
  ccc
    c
  `,
];

const G = {
  WIDTH: 70,
  HEIGHT: 100,
  raindrops_SPEED_MIN: 0.5,
  raindrops_SPEED_MAX: 1.0,
  player_speed: 0.5,
  animationDelay: 10, // Adjust the delay value as needed
};

options = {
  viewSize: { x: G.WIDTH, y: G.HEIGHT },
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
 * }} Raindrop
 */

/**
 * @type  { Raindrop [] }
 */
let raindrops;

// Direction variable for the player
let playerDirection = 1; // 1 for right, -1 for left

// Animation frames for the player
const playerFrames = [0, 1];
let playerFrameIndex = 0;

// Counter for animation delay
let animationCounter = 0;

// Counter for timer
let timer;

// The game loop function
function update() {
  // The init function running at startup
  if (!ticks) {
    raindrops = times(8, () => {
      const posX = rnd(0, G.WIDTH);
      const posY = rnd(0, 30);
      return {
        pos: vec(posX, posY),
        speed: rnd(G.raindrops_SPEED_MIN, G.raindrops_SPEED_MAX),
      };
    });

    player = {
      pos: vec(G.WIDTH * 0.5, 94),
      frameIndex: 0,
    };

    score = 0;
    timer = 0;
  } // end of if !ticks

  // Draw rectangles for border
  color("black");
  rect(0, 0, 1, 99); // left border
  rect(69, 0, 1, 99); // right border
  rect(0, 97, 99, 3); // floor border

  // PLAYER ----------------
  player.pos.x += G.player_speed * playerDirection;
  // When player taps switch direction
  if (input.isJustPressed) {
    playerDirection *= -1;
  }
  // Ensure the player stays within the game boundaries
  player.pos.x = clamp(player.pos.x, 2, 67);
  if(player.pos.x == 2 || player.pos.x == 67)
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

  timer += 1 / 60;
  // Check if the timer has reached 30 seconds
  if (timer >= 30) {
    end();
  }

  // Update for raindrop
  raindrops.forEach((r) => {
    r.pos.y += r.speed;
    color("blue");
    box(r.pos, 1.3);
    r.pos.wrap(0, G.WIDTH, -5, G.HEIGHT);

    // Randomize raindrop positions after wrapping
    if (r.pos.y <= 0){
      r.pos.x = rnd(0, G.WIDTH);
    }

    // Check if a raindrop has touched the ground
    if (r.pos.y >= G.HEIGHT - 3) {
      // Increase the score
      score++;
      // Reset the raindrop position
      r.pos.y = rnd(0, 30);
      r.pos.x = rnd(0, G.WIDTH);
    }
    
    const IsCollidingWithRain = box(r.pos, 1.3).isColliding.char.a;

    if (IsCollidingWithRain){
      end();
    }
  });

  // Display the timer
  color("black");
  text(`Time ${Math.ceil(30 - timer)}`, G.WIDTH - 42, 10);
}