class GlobalMap {
    constructor(name, player) {
        this.element = document.querySelector('#map');
        this.colisions = [];
        this.locations = []
        this.position = new Position((gameConfig.dimensions.center.x)-player.position.x, (gameConfig.dimensions.center.y)-player.position.y)
        load(`/assets/Maps/${name}.json`).then((json) => {
            this.addLayers(json)
        }).catch(console.log)
    }
    addLayers(json) {
        console.log('Mapa cargado con AJAX');
        const {tilesets, layers} = json;
        layers.filter(l => l.type == "objectgroup").forEach(layer => {
            console.log(layer.name);
            if (layer.name == "colisiones") {
                layer.objects.forEach((colision, i) => {
                    this.colisions.push(new Rectangle(colision.x*(gameConfig.dimensions.tileSize/tilesets[0].tilewidth), colision.y*(gameConfig.dimensions.tileSize/tilesets[0].tileheight), colision.width*(gameConfig.dimensions.tileSize/tilesets[0].tilewidth), colision.height*(gameConfig.dimensions.tileSize/tilesets[0].tileheight), "colision" + i, "#colisions"))
                });
                if (debug.debugging) this.colisions.forEach(c => c.render("#ff0000"))
            } else if (layer.name == "localizaciones") {
                layer.objects.forEach((location, i) => {
                    this.locations.push(new LocationObject(location.x*(gameConfig.dimensions.tileSize/tilesets[0].tilewidth), location.y*(gameConfig.dimensions.tileSize/tilesets[0].tileheight), location.width*(gameConfig.dimensions.tileSize/tilesets[0].tilewidth), location.height*(gameConfig.dimensions.tileSize/tilesets[0].tileheight), location.name))
                });
                if (debug.debugging) this.locations.forEach(c => c.colision.render("#00ff00"))
            }
        });
        this.element.style.position = "absolute"
        this.element.style.backgroundImage = `url('${tilesets[0].image}')`;
        this.element.style.width = `${gameConfig.dimensions.tileSize*20}px`
        this.element.style.height = `${gameConfig.dimensions.tileSize*20}px`
        this.element.style.backgroundSize = `${gameConfig.dimensions.tileSize*20}px ${gameConfig.dimensions.tileSize*20}px`
    }
    draw(tr, player) {
        this.element.style.top = (gameConfig.dimensions.center.y-player.position.y)+"px"
        this.element.style.left = (gameConfig.dimensions.center.x-player.position.x)+"px"
        if (debug.debugging) {
            this.colisions.forEach(col => {
                col.render("#ff0000")
            })
        }    
    }
    update(tr, player) {
        this.position = new Position((gameConfig.dimensions.center.x)-player.position.x, (gameConfig.dimensions.center.y)-player.position.y)
        this.colisionGeneral = new Rectangle(this.position.x, this.position.y, 960, 960)
    }
}