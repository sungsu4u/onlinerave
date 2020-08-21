let _rave_blex_uuid = '00000000-0000-1000-8000-00805f9b34fb';
var _rave_ble_device;
var _rave_ble_service;
var _rave_payer = null;

function _rave_youtube_player(player) {
	_rave_payer = player;
}

function _rave_YT_timecheck() {
	//var tm = _rave_payer.getDuration();
	var tm = _rave_payer.getCurrentTime();
	//console.log(tm);
}

function _rave_ble_paring() {
	//setInterval(_rave_YT_timecheck, 1000);
	_rave_ble_device = null;
  
	let filters = [];

	let options = {};
	filters.push({services: [_rave_blex_uuid]});
	options.filters = filters;

	console.log('Requesting Bluetooth Device...');
	navigator.bluetooth.requestDevice(options)
	.then(device => {
		_rave_ble_device = device;
		_rave_ble_device.addEventListener('gattserverdisconnected', _rave_reconnect);
		console.log('> Name:             ' + device.name);
		console.log('> Id:               ' + device.id);
		_rave_connect(false);
	})
	.catch(error => {
		console.log('Argh! ' + error);
	});
}

function _rave_bleconnect() {
	return _rave_ble_device.gatt.connect();
}

function _rave_reconnect() {
	_rave_connect(true);
}

function _rave_connect(retry) {
	_rave_bleconnect()
	.then(server => {
		return server.getPrimaryService(_rave_blex_uuid);
	})
	.then(service => {
		return service.getCharacteristic(_rave_blex_uuid);
	})
	.then(characteristic => {
		_rave_ble_service = characteristic;
		var  rgb = new Uint8Array([ 0x00, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]);
		return characteristic.writeValue(rgb);
	})
	.catch(error => {
		if (retry) setTimeout(_rave_reconnect, 3000);
		else     console.log('Argh! ' + error);
	});
}

function _rave_ble_write() {  
	_rave_ble_service.writeValue(data);
}
