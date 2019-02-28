//planet textures pulled from http://planetpixelemporium.com

var camON = false; // cam normaly stationary

PImage suntxt;
PImage strtxt;
PImage plntxt = new PImage[5];
PImage montxt = new PImage[2];

function setup() {
  createCanvas(600, 500, WEBGL);
  // debugMode(AXES);

  //load images for planets and background
  strtxt = loadimage("starfield.jpg");
  suntxt = loadImage("sun.jpg");
  plntxt[0] = loadImage("earth.jpg");
  plntxt[1] = loadImage("earthcloud.jpg");
  plntxt[2] = loadImage("earthnight.jpg");
  plntxt[3] = loadImage("jupiter.jpg");
  plntxt[4] = loadImage("mars.jpg");
  montxt[0] = loadImage("moon.jpg");
  montxt[1] = loadImage("pluto.jpg");

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
  background(21); //black space
  let camX = map(mouseX, 0, width, -600, 600);
  let camY = map(mouseY, 0, height, -500, 500);
  if (!camON) {
    camX = 0;
    camY = 0;
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