var camON = false; // cam normaly stationary

function setup() {
  createCanvas(600, 500, WEBGL);
  // debugMode(AXES);
  //create circle with
  //radius 45, dist from center 0, rotationspeed 0, angle 0, level 1, yellow, no wobble
  sun = new Planet(45, 0, 0, 0, 1, color(200, 100, 20), 0, createVector(0, 1, 0));
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
  ambientLight(255);
  //  translate(width / 2, height / 2); //sun in center
  sun.show(); //show solar system
  sun.spin(); //itterate solar system
}

function keyPressed() {
  if (keyCode == 72) noLoop(); //h = stop animation loop
  if (keyCode == 71) loop(); //g = restart animation loop
  if (keyCode == 32) {
    if (camON) camON = false;
    else if (!camON) camON = true;
  }
  console.log(camON);
}