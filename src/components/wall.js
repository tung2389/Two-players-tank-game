class Wall {
    constructor(x1, y1, x2, y2, thickness, color) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.slope = (y2 - y1) / (x2 - x1);
        this.thickness = thickness;
        this.color = color;
    }
    draw() {
        sketch1.push();
        sketch1.strokeWeight(this.thickness);
        sketch1.stroke(this.color)
        sketch1.line(this.x1,this.y1,this.x2,this.y2)
        sketch1.pop();
    }
}