const stateMachine = {
    actualState: null,
    start() {
        this.actualState = new MapState()
    },
    changeState(state) {
        document.body.innerHTML = "<h1 style=\"color: #fff;\">PROXIMAMENTE</h1>"
    },
    update(tr) {
        this.actualState.update(tr)
    },
    draw(tr) {
        this.actualState.draw(tr)
    }
}