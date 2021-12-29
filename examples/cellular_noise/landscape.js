class Landscape extends GameObject {
  constructor(ID) {
    super(ID);
  }

  init(context) {
    this.position.set(0, 0, 0);
    this.dimensions = context.dimensions;
    this.delay = 50;

    this.largest = Math.sqrt(
      Math.pow(this.dimensions.x, 2) + Math.pow(this.dimensions.y, 2)
    );

    this.points = [];
    this.amountPoints = 40;
    this.zoomRate = 10;
    this.z = this.dimensions.y / 2;
    this.direction = 4.5;

    for (let i = 0; i < this.amountPoints; i++) {
      let x = getRandom(0, this.dimensions.x);
      let y = getRandom(0, this.dimensions.y);
      let z = getRandom(0, this.dimensions.y);

      this.points.push(new Vector(x, y, z));
    }

    this.time = new Date().getTime();
    context.triggerBG();
  }

  loop(context) {
    if (this.z < 0) return;

    context.drawBackground();
    for (let x = 0; x < this.dimensions.x; x += this.zoomRate - 1) {
      for (let y = 0; y < this.dimensions.y; y += this.zoomRate - 1) {
        let xOff = x + (this.zoomRate - 1);
        let yOff = y + (this.zoomRate - 1);
        let vecOff = new Vector(xOff, yOff, this.z);
        let vec = new Vector(x, y, this.z);
        let shortest = Infinity;

        if (x > this.dimensions.x || y > this.dimensions.y) continue;

        this.points.forEach((point) => {
          let result = Vector.substract(vec, point);

          let dist = result.module();

          if (dist < shortest) shortest = dist;

          let r = 0.3 + getRandom(-0.01, 0.01);
          clamp(r, 0, 1);

          point.x = clamp(point.x + getRandom(-r, r), 0, this.dimensions.x);
          point.y = clamp(point.y + getRandom(-r, r), 0, this.dimensions.y);
          point.z = clamp(point.z + getRandom(-r, r), 0, this.dimensions.y);
        });

        let opacity = shortest / this.largest + 0.25;

        let color = new Color(70, 0, 20, opacity);

        context.drawRect(vec, vecOff, color);
      }
    }
  }

  castNumber(number, min, max) {}
}
