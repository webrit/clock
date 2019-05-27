"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var blocks = document.querySelectorAll('.phrase');
var arrowHours = document.querySelector('.clock__arrow_hours');
var arrowMinute = document.querySelector('.clock__arrow_minute');
var timeHours = document.querySelector('.clock__time_hours');
var timeMinutes = document.querySelector('.clock__time_minutes');

for (var i = 0, len = blocks.length; i < len; i++) {
  var block = blocks[i];
  var str = block.textContent;
  block.innerText = '';
  block.setAttribute('string', str);

  var arr = _toConsumableArray(str);

  for (var _i = 0, _len = arr.length; _i < _len; _i++) {
    var span = document.createElement('span');
    span.className = "symbol".concat(_i);
    span.innerText = arr[_i];
    block.appendChild(span);
  }
}

hours();
minutes();
var requestHours = requestAnimationFrame(checkHours);
var requestMinutes = requestAnimationFrame(checkMinutes);

function checkHours() {
  setTimeout(function () {
    requestHours = requestAnimationFrame(checkHours);
    hours();
  }, 1000);
}

function checkMinutes() {
  setTimeout(function () {
    requestMinutes = requestAnimationFrame(checkMinutes);
    minutes();
  }, 1000);
}

function beautifulPositionHour() {
  var today = new Date(),
      thisMinute = today.getMinutes();
  var beautiDeg = Number(arrowHours.style.transform.match(/rotate\((.*)deg\)/)[1]);

  if (thisMinute > 15 && thisMinute < 29) {
    beautiDeg += 7;
  }

  if (thisMinute > 30 && thisMinute < 49) {
    beautiDeg += 15;
  }

  if (thisMinute > 50) {
    beautiDeg += 22;
  }

  arrowHours.style.transform = "translate(-50%, -50%) rotate(".concat(beautiDeg, "deg)");
}

function minutes() {
  var today = new Date(),
      thisMinute = today.getMinutes();
  var degMinutes = [];

  for (var _i2 = 0; _i2 < 60; _i2++) {
    degMinutes.push(_i2 * 6);
  }

  var filter_minute = degMinutes.filter(function (item, key) {
    return key === thisMinute;
  });
  arrowMinute.style.transform = "translate(-50%, -50%) rotate(".concat(filter_minute[0], "deg)");

  if (thisMinute < 10) {
    thisMinute = "0".concat(thisMinute);
  }

  timeMinutes.innerText = thisMinute;
  beautifulPositionHour();
}

function hours() {
  var today = new Date(),
      thisHour = today.getHours();
  var degHours = [];

  for (var _i3 = 0; _i3 <= 24; _i3++) {
    if (_i3 <= 12) {
      degHours.push(_i3 * 30);
    } else {
      degHours.push((_i3 - 12) * 30);
    }
  }

  var filter_hour = degHours.filter(function (item, key) {
    return key === thisHour;
  });
  arrowHours.style.transform = "translate(-50%, -50%) rotate(".concat(filter_hour[0], "deg)");

  if (thisHour < 10) {
    thisHour = "0".concat(thisHour);
  }

  timeHours.innerText = thisHour;
  beautifulPositionHour();
}