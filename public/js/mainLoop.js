const mainLoop = {
    lastRegister: 0,
    execId: 0,
    fps: 0,
    lastFPSRegister: 0,
    loop(temporalRegister) {
        mainLoop.execId = window.requestAnimationFrame(mainLoop.loop);
        mainLoop.update(temporalRegister);
        mainLoop.draw(temporalRegister);
        mainLoop.fps++;
        if (temporalRegister - mainLoop.lastRegister > 999) {
            mainLoop.lastRegister = temporalRegister;
            console.log(`${mainLoop.fps} FPS`);
            mainLoop.lastFPSRegister = mainLoop.fps
            mainLoop.fps = 0
        }
    },
    draw(temporalRegister) {
        stateMachine.draw(temporalRegister)
    },
    update(temporalRegister) {
        stateMachine.update(temporalRegister)
    }
}