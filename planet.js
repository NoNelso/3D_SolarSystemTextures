function Planet(radius, distance, speed, angle, level, wobble,
  vect, txtr) {
  this.r = radius;
  this.d = distance;
  this.s = speed;
  this.a = angle;
  this.l = level;
  this.w = wobble;
  this.v = vect;
  this.planets = [];
  this.t = txtr;
  noStroke();
  nofill();
  this.globe = createShape(SPHERE, this.r);
  this.globe.setTexture(this.t);

  this.spin = function() {
    this.a += this.s; // base spin rate on speed
    if (this.w == 1) this.d = this.d + sin(this.a); // if wobble set, wobbles as it rotates
    for (let i in this.planets) this.planets[i].spin(); //recursive check dependants & re-call function
  }

  this.spawnSpiners = function(childNum, lv) {
    console.log("C#", childNum, "LV", lv);
    for (let j = 0; j < childNum; ++j) { //create planets by children number per lv
      let rad = ceil(this.r / (lv + .3)); //each level is slightly smaler than parent
      let dis = floor(random(100, 150) / lv); //each planet rand dist from parent
      let spd = random(-.075, .075); //each planet at rand orbit speed
      let ang = random(TWO_PI);
      let lev = lv;
      let vec = p5.Vector.random3D();
      if (lev == 2) let txt = plntxt[floor(random(4.999))];
      else if (lev == 3) let txt = montxt[floor(random(1.999))];
      this.planets.push(new Planet(rad, dis, spd, ang, lev, col, 1, vec));
      if (lv < 3) { //if level not at cap spawn again
        this.planets[j].spawnSpiners(5 - lv, 1 + lv);
      }
    }
    noLoop();
  }

  this.show = function() { //save state, move center, show, and reload state
    push();
    rotate(this.a, this.v);
    translate(this.d, 0, 0);
    shape(globe);
    for (let k in this.planets) this.planets[k].show();
    pop();
  }
}