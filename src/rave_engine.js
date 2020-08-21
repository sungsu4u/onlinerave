
serverUrl = "ws://54.249.245.7:7777";

var timerEngine;

var cycle = 250;

var curColors = [
    "00000000000000000000",
    "00000000000000000000"
];

var stopColors = [
    "00000000000000000000",
    "00000000000000000000"
];

var curColorIndex = 0;


function engineStart() {
    console.log("Rave Timer Started.");
    timerEngine = setInterval(engine, cycle);

    curColorIndex = 0;
}

function engineStop() {
    console.log("Rave Timer Stopped.");
    clearTimeout(timerEngine);

    curColorIndex = 0;
}

function engine() {
    console.log("colors:" + curColors[curColorIndex]);

    if (curColors.length > curColorIndex) {
        sendData(curColors[curColorIndex]);    
        curColorIndex += 1;

        if (curColorIndex >= curColors.length) {
            curColorIndex = 0;
        }
    }
}




var ws;
var pingertimer;

// var pingnumber = 0;


document.addEventListener('DOMContentLoaded', () => {

    var online_status = document.getElementById('online_status');
    var txtRecv = document.getElementById('Recv');
    

    ws = new WebSocket(serverUrl);

    // websocket 서버에 연결되면 연결 메시지를 화면에 출력한다.
    ws.onopen = function(event){
        // online_status.innerText = "Connected to "+ serverUrl;

        // // Start ping service
        // pingToServer();

        console.log("Connected.")
    };

    // websocket 에서 수신한 메시지를 화면에 출력한다.
    ws.onmessage = function(event){
        // // txtRecv.innerHTML = ">> " + event.data + "<br>" + txtRecv.innerHTML;
        // console.log("msg:" + )
        // _rave_ble_write(event.data);
        // console.log(event.data);
    };

    // websocket 세션이 종료되면 화면에 출력한다.
    ws.onclose = function(event){
        // online_status.innerText = "Disconnected";
    }
    
    // console.log("x : " + x);

    // Start Engine
    engineStart();
});

// 사용자가 입력한 메시지를 서버로 전송한다.
function sendMessage()
{
    var txtSend = document.getElementById('Send');

    ws.send( txtSend.value );
 
    txtSend.innerHTML = "";
}


function sendData(data) {
    ws.send( data );
}
// Ping to server

function pingToServer() {
    pingertimer = setTimeout(pingToServer, 1000);

    var pingdata = pingnumber + " " + Date("ss.sss")
    ws.send(pingdata);
 
    // console.log(pingdata)
    pingnumber += 1;
}


// Convert a hex string to a byte array
function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

// Convert a byte array to a hex string
function bytesToHex(bytes) {
    for (var hex = [], i = 0; i < bytes.length; i++) {
        var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
        hex.push((current >>> 4).toString(16));
        hex.push((current & 0xF).toString(16));
    }
    return hex.join("");
}



