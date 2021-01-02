class MapState {
    constructor(name) {
        this.player = new Player(new Position(575, 575), "/assets/img/players.png", 5)
        this.map = new GlobalMap("desert", this.player)
    }
    draw(tr) {
        this.map.draw(tr, this.player)
        this.player.draw(tr, this.map)
    }
    update(tr) {
        this.map.update(tr, this.player)
        this.player.update(tr, this.map)
    }
}