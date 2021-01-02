const popup = {
    element: document.querySelector('#popup'),
    visible: false,
    actuaLocation: "",
    show(name) {
        this.actuaLocation = name
        this.visible = true
        this.element.style.display = "inline-block"
        this.element.innerHTML = name;
        this.element.style.position = "absolute"
        this.element.style.backgroundColor = "#000"
        this.element.style.border = "2px solid #fff"
        this.element.style.color = "#fff"
        this.element.style.width = "200px"
        this.element.style.paddingTop = "5px"
        this.element.style.height = "25px"
        this.element.style.textAlign = "center"
        this.element.style.top = `${gameConfig.dimensions.height/2 - 50}px`
        this.element.style.left = `${gameConfig.dimensions.width/2 - 100}px`
    },
    hide() {
        this.visible = false;
        this.element.style.display = "none"
    }
}