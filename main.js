var currentDigits = [0b00000000, 0b00000000, 0b00000000, 0b00000000];

function addFrame() {
	updateOutput();

	currentDigits = [0b00000000, 0b00000000, 0b00000000, 0b00000000];

	Array.from(document.getElementsByClassName('segment-vertical')).forEach(element => {
		element.setAttribute('onclick', 'enable(this)');
		element.style.backgroundColor = 'gray';
	});

	Array.from(document.getElementsByClassName('segment-horizontal')).forEach(element => {
		element.setAttribute('onclick', 'enable(this)');
		element.style.backgroundColor = 'gray';
	});
}

function removeFrame() {
	var out = document.getElementById('output');
	out.value = out.value.substring(0, out.value.length - 46);
}

function clearOutput() {
	document.getElementById('output').value = '';
}

function enable(element) {
	element.setAttribute('onclick', 'disable(this)');
	element.style.backgroundColor = 'red';

	var params = getParams(element);
	currentDigits[params.index] += params.bit;
}

function disable(element) {
	element.setAttribute('onclick', 'enable(this)');
	element.style.backgroundColor = 'gray';

	var params = getParams(element);
	currentDigits[params.index] -= params.bit;
}

function updateOutput() {
	var out = document.getElementById('output');
	var text;

	if (out.value != '') {
		text = ',\n{';
	} else {
		text = '{';
	}

	currentDigits.forEach(digit => {
		text += 'B' + ('0000000' + digit.toString(2)).substr(-8) + ', ';
	});

	out.value += text.substring(0, text.length - 2) + '}';
}

function getParams(element) {
	var bit = parseInt(element.getAttribute('name').substring(2), 2);
	var index;

	if (bit === 0b10000000 || bit === 0b00000010 || bit === 0b00010000) {
		index = parseInt(element.parentElement.getAttribute('name'));
	} else {
		index = parseInt(element.parentElement.parentElement.getAttribute('name'));
	}

	return {
		bit: bit,
		index: index
	};
}
