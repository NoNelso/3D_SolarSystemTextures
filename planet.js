function Planet(radius, distance, speed, angle, level, hue, wobble, vect) {
  //create object with vars and dependant array
  this.r = radius;
  this.d = distance;
  this.s = speed;
  this.a = angle;
  this.l = level;
  this.c = hue;
  this.w = wobble;
  this.v = vect;
  this.planets = [];

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
      let col = color(floor(random(250)), floor(random(250)), floor(random(250)), 175);
      let lev = lv;
      let vec = p5.Vector.random3D();
      this.planets.push(new Planet(rad, dis, spd, ang, lev, col, 1, vec));
      if (lv < 3) { //if level not at cap spawn again
        this.planets[j].spawnSpiners(5 - lv, 1 + lv);
      }
    }
    noLoop();
  }

  this.show = function() { //save state, move center, show, and reload state
    push();
    // noStroke();
    fill(this.c);
    rotate(this.a, this.v);
    translate(this.d, 0, 0);
    sphere(this.r);
    for (let k in this.planets) this.planets[k].show();
    pop();
  }
}