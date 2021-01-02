class LocationObject {
    constructor(x, y, width, height, name) {
        this.colision = new Rectangle(x, y, width, height, `location${name}`, "#locations");
        this.name = name;
    }
}