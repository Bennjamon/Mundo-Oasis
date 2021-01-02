class Position {
    static get ZERO () {
        return new Position(0, 0)
    }
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(pos) {
        this.x += pos.x;
        this.y += pos.y
    }
}