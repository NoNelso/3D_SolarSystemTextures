function Planet(radius, distance, speed, angle, level, wobble,
  vect, txtr) {
  //create object with vars and array of orbiting dependants
  this.r = radius;
  this.d = distance;
  this.s = speed;
  this.a = angle;
  this.l = level;
  this.w = wobble;
  this.v = vect;
  this.planets = [];
  this.t = txtr;
  this.globe = createShape(SPHERE, this.r);
  this.globe.setTexture(this.t);

  this.spin = function() {
    // base spin rate on speed
    this.a += this.s;
    // if wobble set, wobbles as it rotates
    if (this.w == 1) this.d = this.d + sin(this.a);
    //recursive check dependants & re-call function
    for (let i in this.planets) this.planets[i].spin();
  }

  this.spawnSpiners = function(childNum, lv) {
    console.log("Cld #", childNum, "LV", lv);
    //create planets by children number per lv
    for (let j = 0; j < childNum; ++j) {
      //each level is slightly smaler than parent
      let rad = ceil(this.r / (lv + .3));
      //each planet rand dist from parent
      let dis = floor(random(100, 150) / lv);
      //each planet at rand orbit speed
      let spd = random(-.075, .075);
      //start at random angle about axis
      let ang = random(TWO_PI);
      //record planet level for debug sake
      let lev = lv;
      //give random vector to orbit about
      let vec = p5.Vector.random3D();
      //assign random texture from pool assigned based on level
      let txt = null;
      if (lev == 1) txt = suntxt;
      if (lev == 2) txt = random(plntxt);
      else if (lev == 3) txt = random(montxt);
      //add new orbiting dependant to dependants array
      this.planets.push(new Planet(rad, dis, spd, ang, lev, 1, vec, txt));
      //if level of new dependant is not at the level cap, spawn again
      if (lv < 3) {
        this.planets[j].spawnSpiners(-1 + childNum, 1 + lv);
      }
    }
    //after final spawn pause the draw loop
    noLoop();
  }

  //save state, move center, showobjects, show dependants, reload state
  this.show = function() {
    push();
    rotate(this.a, this.v);
    translate(this.d, 0, 0);
    shape(globe);
    for (let k in this.planets) this.planets[k].show();
    pop();
  }
}