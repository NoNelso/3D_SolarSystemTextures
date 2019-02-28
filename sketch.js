//planet textures pulled from http://planetpixelemporium.com

var camON = false; // cam normaly stationary

let suntxt;
let strtxt;
let plntxt[5];
let montxt[2];


function setup() {
  createCanvas(600, 500, WEBGL);
  // debugMode(AXES);

  //load images for planets and background
  strtxt = loadImage('textures/starfield.jpg');
  suntxt = loadImage('textures/sun.jpg');
  plntxt[0] = loadImage('textures/earth.jpg');
  plntxt[1] = loadImage('textures/earthcloud.jpg');
  plntxt[2] = loadImage('textures/earthnight.jpg');
  plntxt[3] = loadImage('textures/jupiter.jpg');
  plntxt[4] = loadImage('textures/mars.jpg');
  montxt[0] = loadImage('textures/moon.jpg');
  montxt[1] = loadImage('textures/pluto.jpg');

  //create circle with
  //radius 45, dist from center 0, rotationspeed 1, angle 0, level 1,
  //no wobble, rotational axis (x=z=0,y=1), texture sun)
  sun = new Planet(45, 0, 1, 0, 1, 0, createVector(0, 1, 0), suntxt);
  //add 6 point lights evenly spaced about sun and at center
  let sunny = color(255, 252, 127)
  pointLight(sunny, 0, 0, 0);
  pointLight(sunny, sun.r, 0, 0);
  pointLight(sunny, 0, sun.r, 0);
  pointLight(sunny, 0, 0, sun.r);
  pointLight(sunny, -sun.r, 0, 0);
  pointLight(sunny, 0, -sun.r, 0);
  pointLight(sunny, 0, 0, -sun.r);

  //create 5 rotating bodies about sun with depth of spawn 1
  sun.spawnSpiners(3, 1);
  console.log("sun", sun);
}

function draw() {
  //starry space
  background(strtxt);
  //if active cam off don't calculate mouse x & y
  if (!camON) {
    camX = 0;
    camY = 0;
  } else {
    let camX = map(mouseX, 0, width, -600, 600);
    let camY = map(mouseY, 0, height, -500, 500);
  }
  let camZ = (height / 2) / tan(PI * 30 / 180);
  camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0);
  ambientLight(100); //low ambien light to see all planets always
  sun.show(); //show solar system
  sun.spin(); //itterate solar system
}

function keyPressed() {
  //h = stop animation loop
  if (keyCode == 72) noLoop();
  //g = restart animation loop
  if (keyCode == 71) loop();
  //spacebar = toggle active camera
  if (keyCode == 32) {
    if (camON) camON = false;
    else if (!camON) camON = true;
  }
  console.log(camON);
}