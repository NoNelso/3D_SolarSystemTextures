//planet textures pulled from http://planetpixelemporium.com

var camON = false; // cam normaly stationary

let suntxt = null;
let strtxt = null;
let plntxt = [null, null, null, null, null];
let montxt = [null, null];

function preload() {
  //load images for planets and background
  strtxt = loadImage("Textures/starfield.jpg");
  suntxt = loadImage("Textures/sun.jpg");
  plntxt[0] = loadImage("Textures/earth.jpg");
  plntxt[1] = loadImage("Textures/earthcloud.jpg");
  plntxt[2] = loadImage("Textures/earthnight.jpg");
  plntxt[3] = loadImage("Textures/jupiter.jpg");
  plntxt[4] = loadImage("Textures/mars.jpg");
  montxt[0] = loadImage("Textures/moon.jpg");
  montxt[1] = loadImage("Textures/pluto.jpg");
}

function setup() {
  createCanvas(600, 500, WEBGL);
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

  noStroke();
  noFill();

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
  //low ambien light to see all planets always
  ambientLight(100);
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