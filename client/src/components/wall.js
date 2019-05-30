class Wall {
    constructor(type, x1, y1, x2, y2, thickness, color) {
        this.type = type;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.thickness = thickness;
        this.color = color;
    }
    draw() {
        push();
        strokeWeight(this.thickness);
        stroke(this.color)
        line(this.x1,this.y1,this.x2,this.y2)
        pop();
    }
}