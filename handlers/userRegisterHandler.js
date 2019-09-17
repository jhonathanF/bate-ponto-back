const serialConnection = require('../models/serialConnection');
var readline = require('readline-promise').default;
const rlp = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

class UserRegisterHandler {

    async handleUserMenuSelection() {
        const matricula = await rlp.questionAsync('   Matricula: ');
        serialConnection.write(JSON.stringify({ type: 2, matricula: +matricula }))
        return;
    }
}

module.exports = new UserRegisterHandler();