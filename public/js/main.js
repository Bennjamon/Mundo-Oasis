const init = () => {
    //debug()
    gameConfig.keyboard.start()
    gameConfig.dimensions.start()
    stateMachine.start()
    mainLoop.loop()
}
document.addEventListener('DOMContentLoaded', init);