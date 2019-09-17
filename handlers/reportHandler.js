
const serialConnection = require('../models/serialConnection');

class ReportHandler {

    handleUserMenuSelection() {
        serialConnection.write(JSON.stringify({ type: 3 }))
        return;
    }

    printResponse(obj) {
        console.log(`\nID: ${obj.id} - Tipo ${obj.entrada ? 'Entrada' : 'Saida'} - Data: ${obj.dia}/${obj.mes}/${obj.ano} ${obj.hora}:${obj.minuto} `);
    }
}

module.exports = new ReportHandler();