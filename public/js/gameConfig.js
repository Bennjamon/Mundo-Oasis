const gameConfig = {
    dimensions: {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        center: null,
        set() {
            gameConfig.dimensions.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            gameConfig.dimensions.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight 
            gameConfig.dimensions.center = new Position(gameConfig.dimensions.width/2, gameConfig.dimensions.height/2)
        },
        start() {
            window.addEventListener("resize", gameConfig.dimensions.set)
            gameConfig.dimensions.center = new Position(gameConfig.dimensions.width/2, gameConfig.dimensions.height/2)
        },
        tileSize: 48
    },
    keyboard: {
        keys: [],
        start() {
            document.addEventListener('keydown', gameConfig.keyboard.keyDown);
            document.addEventListener('keyup', gameConfig.keyboard.keyUp);
        },
        keyDown(e) {
            if (gameConfig.keyboard.keys.indexOf(e.key.toUpperCase()) == -1) gameConfig.keyboard.keys.push(e.key.toUpperCase())
        },
        keyUp(e) {
            gameConfig.keyboard.keys.splice(gameConfig.keyboard.keys.indexOf(e.key.toUpperCase()), 1)
        },
        isKeyPressed(key) {
            return ((typeof key == "string"? gameConfig.keyboard.keys.includes(key.toUpperCase()) : Array.isArray(key)? key.map(gameConfig.keyboard.keys.includes).reduce((a, b) => a || b) : false))
        },
        getKeyStrength(key) {
            return (typeof key == "string"? (gameConfig.keyboard.isKeyPressed(key)? true : false) : Array.isArray(key)? key.reduce((a, b) => a || gameConfig.keyboard.isKeyPressed(b), false) : false)? 1 : 0
        }
    },
    playerVelocity: 5,
    controls: {
        UP: [
            "W",
            "ARROWUP"
        ],
        DOWN: [
            "S",
            "ARROWDOWN"
        ],
        RIGHT: [
            "D",
            "ARROWRIGHT"
        ],
        LEFT: [
            "A",
            "ARROWLEFT"
        ],
        INVENTARY: "E",
        LOCATION: "R"
    },
    fps: 7  
} 