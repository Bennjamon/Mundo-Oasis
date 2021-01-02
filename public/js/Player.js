class Player {
    constructor(pos, spritesPath, idSprites) {
        this.element = document.querySelector('#player');
        this.position = pos;
        this.spritesPath = spritesPath;
        this.fps = 0;
        this.idSprites = idSprites;
        this.actualSprite = 0;
        this.actualSpriteSet = 0;
        this.velocity = Position.ZERO
        this.colisionMasks = {
            GENERAL: new Rectangle(gameConfig.dimensions.center.x, gameConfig.dimensions.center.y, gameConfig.dimensions.tileSize, gameConfig.dimensions.tileSize),
            UP: new Rectangle(gameConfig.dimensions.center.x + gameConfig.dimensions.tileSize/4, gameConfig.dimensions.center.y + 1, gameConfig.dimensions.tileSize/4, 1, "CU", "#player"),
            DOWN: new Rectangle(gameConfig.dimensions.center.x + gameConfig.dimensions.tileSize/4, gameConfig.dimensions.center.y - 1 + gameConfig.dimensions.tileSize, gameConfig.dimensions.tileSize/4, 1, "CD", "#player"),
            LEFT: new Rectangle(gameConfig.dimensions.center.x + 1, gameConfig.dimensions.center.y + gameConfig.dimensions.tileSize/4, 1, gameConfig.dimensions.tileSize/4, "CL", "#player"),
            RIGHT: new Rectangle(gameConfig.dimensions.center.x - 1 + gameConfig.dimensions.tileSize, gameConfig.dimensions.center.y + gameConfig.dimensions.tileSize/4, 1, gameConfig.dimensions.tileSize/4, "CR", "#player"),
        }
    }
    draw(rt) {
        this.element.style.zIndex = "2"
        this.element.style.position = "absolute"
        this.element.style.top = gameConfig.dimensions.center.y + "px";
        this.element.style.left = gameConfig.dimensions.center.x + "px";
        this.element.style.backgroundImage = `url('${this.spritesPath}')`;
        this.element.style.width = gameConfig.dimensions.tileSize + "px";
        this.element.style.height = gameConfig.dimensions.tileSize + "px";
    }
    update(tr, map) {
        this.moveAndCollide(map)
        this.animate()
        this.getLocations(map)
    }
    moveAndCollide(map) {
        this.velocity = this.collide(map, this.getVelocity())
        this.position.add(this.velocity)
    }
    getVelocity() {
        return new Position((gameConfig.keyboard.getKeyStrength(gameConfig.controls.RIGHT) - gameConfig.keyboard.getKeyStrength(gameConfig.controls.LEFT))*gameConfig.playerVelocity, (gameConfig.keyboard.getKeyStrength(gameConfig.controls.DOWN) - gameConfig.keyboard.getKeyStrength(gameConfig.controls.UP))*gameConfig.playerVelocity);
    }
    collide(map, vel) {
        map.colisions.map(col => new Rectangle(col.x + map.position.x, col.y + map.position.y, col.width, col.height)).forEach((col) => {
            if (col.collideWith(this.colisionMasks.DOWN) && vel.y > 0) vel.y = 0
            if (col.collideWith(this.colisionMasks.UP) && vel.y < 0) vel.y = 0
            if (col.collideWith(this.colisionMasks.LEFT) && vel.x < 0) vel.x = 0
            if (col.collideWith(this.colisionMasks.RIGHT) && vel.x > 0) vel.x = 0
        })
        return vel
    }
    animate() {
        if (this.velocity.x == 0 && this.velocity.y == 0){ 
            this.actualSprite = 0
            this.fps = 0
        } else {
            if (this.velocity.x != 0) {
                this.actualSpriteSet = 1;
                this.element.style.transform = `scaleX(${this.velocity.x < 0? -1 : 1})`
            } else if (this.velocity.y > 0) { 
                this.actualSpriteSet = 0
            } else if (this.velocity.y < 0) {
                this.actualSpriteSet = 2;
            }
            if (this.fps >= mainLoop.lastFPSRegister/gameConfig.fps) {
                if (this.velocity.x != 0 || this.velocity.y > 0) {
                    if (this.actualSprite >= 2) {
                        this.actualSprite = 0
                    } else {
                        this.actualSprite++
                    }
                }
                this.fps = 0;
            } else {
                this.fps++
            }
        }
        this.element.style.backgroundPosition = `-${this.actualSpriteSet*(gameConfig.dimensions.tileSize*3)+(this.actualSprite*48)}px -${this.idSprites*48}px`;
    }
    getLocations(map) {
        map.locations.forEach(location => {
            const rectangle = new Rectangle(location.colision.x + map.position.x, location.colision.y + map.position.y, location.colision.width, location.colision.height)
            if (rectangle.collideWith(this.colisionMasks.GENERAL)) {
                if (!popup.visible) {
                    popup.show(location.name);
                } 
                if (gameConfig.keyboard.isKeyPressed(gameConfig.controls.LOCATION)) {
                    stateMachine.changeState()
                }
            } else if (popup.actuaLocation == location.name && popup.visible) {
                popup.hide()
            }
        })
    }
}