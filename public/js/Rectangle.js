class Rectangle {
    constructor(x, y, w, h, id, father) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.element = document.createElement("div");
        this.element.id = id;
        this.father = document.querySelector(`${father}`);
        this.id = id;
    }
    render(color= "#" + Math.floor(Math.random()*16777215).toString(16)) {
        if (!this.father.querySelector("#" + this.id)) this.father.appendChild(this.element)
        this.element.style.display = "inline-block"
        this.element.style.position = "absolute"
        this.element.style.top = this.y + "px";
        this.element.style.left = this.x + "px";
        this.element.style.width = this.width + "px";
        this.element.style.height = this.height + "px";
        this.element.style.backgroundColor = color
    }
    collideWith(rectangle = new Rectangle(0, 0, 0, 0, "", "")) {
        return (((this.x < rectangle.x + rectangle.width &&
            this.x > rectangle.x) || 
            (rectangle.x < this.x + this.width && rectangle.x > this.x)) && 
            ((this.y < rectangle.y + rectangle.height &&
                this.y > rectangle.y) ||
                (rectangle.y < this.y + this.height &&
                    rectangle.y > this.y)))
                    ? true : false
    }
    
}