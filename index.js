var Menu = require('terminal-menu');
var readline = require('readline-promise').default;
const serialConnection = require('./models/serialConnection');
const DateHandler = require('./handlers/dateConfigHandler');
const UserRegisterHandler = require('./handlers/userRegisterHandler');
const ReportHandler = require('./handlers/reportHandler');

serialConnection.initSerialConnection();

const rlp = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
});

main();
async function main() {
    while (1) {
        setMenu();
        const resposta = await rlp.questionAsync('');
        if (resposta == 1) {
            await DateHandler.handleUserMenuSelection();
        }
        else if (resposta == 2) {
            await UserRegisterHandler.handleUserMenuSelection();
        }
        else if (resposta == 3) {
            ReportHandler.handleUserMenuSelection();
        }
        else {
            console.log("Opção Inválida");
            await sleep(1000);
        }
    }
}

function setMenu() {
    process.stdout.write('\033c');
    console.log('\n\n');
    console.log('   BATE PONTO\n');
    console.log('   -------------------------\n');

    console.log('   1 - CONFIGURAR HORARIO');
    console.log('   2 - CADASTRAR USUARIO');
    console.log('   3 - VISUALIZAR RELATORIO');

}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}