"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _now = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/date/now"));

var _require = require("date-fns"),
    format = _require.format;

var now = function now() {
  var dateString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _now["default"])();
  var date = new Date(dateString);
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
};

var nowAsString = function nowAsString() {
  return format(now(), "yyyyMMddHHmmss");
};

module.exports = {
  now: now,
  nowAsString: nowAsString
};