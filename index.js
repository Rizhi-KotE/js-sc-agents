import {SctpClient} from "@ostis/sc-network"

function onConnect() {
    console.log('Connect to sctp server');
}

function onDisconnect() {
    console.log('Disconnect from sctp server');
}

function onError() {
    console.log('Error in Sctp connection');
}

alert("Hello");
const client = new SctpClient('ws://localhost:8081/sctp', 500,
    onConnect,
    onDisconnect,
    onError);

