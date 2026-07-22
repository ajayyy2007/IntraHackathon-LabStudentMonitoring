const commands = [];

function addCommand(command) {

    commands.unshift({
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...command
    });

}

function getCommands() {
    return commands;
}

module.exports = {
    addCommand,
    getCommands
};