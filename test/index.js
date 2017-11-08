var path = require('path');
process.chdir(path.dirname(__filename));
var tap = require('agraddy.test.tap')(__filename);

var mod = require('../');

start();

function start() {
	var index = 0;
	mod(function() {
		return index < 3
	},
	function(cb) {
		index++;
		cb();
	},
	function(err) {
		tap.assert.equal(index, 3, 'Should be equal.');
		endEarly();
	});
}

function endEarly() {
	var index = 0;
	mod(function() {
		return index < 3
	},
	function(cb) {
		index++;
		if(index == 2) {
			cb(new Error('End early'));
		} else {
			cb();
		}
	},
	function(err) {
		tap.assert.equal(err.message, 'End early', 'An error should short circuit.');
		tap.assert.deepEqual(index, 2, 'Should be equal.');
		async();
	});
}


function async() {
	var index = 0;
	var order;

	order = 'before';
	mod(function() {
		return index < 100
	},
	function(cb) {
		index++;
		cb();
	},
	function(err) {
		tap.assert.equal(order, 'after', 'Make sure it is actually async.');
		end();
	});
	order = 'after';
}

function end() {
}
