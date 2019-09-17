
const serialConnection = require('../models/serialConnection');
var readline = require('readline-promise').default;
const rlp = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

class DateConfigHandler {

    async handleUserMenuSelection() {
        const dia = await rlp.questionAsync('   Dia: ');
        const mes = await rlp.questionAsync('   Mes: ');
        const ano = await rlp.questionAsync('   Ano: ');
        const hora = await rlp.questionAsync('   Hora: ');
        const minuto = await rlp.questionAsync('   Minuto: ');
        const segundo = await rlp.questionAsync('   Segundo: ');
        let data = new Date(ano, mes - 1, dia, hora, minuto, segundo);
        console.log("Registrando data: " + data.getTime())
        serialConnection.write(JSON.stringify({ type: 1, dia: +dia, mes: +mes, ano: +ano, hora: +hora, minuto: +minuto, segundo: +segundo }))
        return;
    }
}

module.exports = new DateConfigHandler();