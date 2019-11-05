"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var fs = require("fs-extra");

var path = require("path");

var date = require("../utils/date");

var migrationsDir = require("../env/migrationsDir");

module.exports = function _callee(description) {
  var source, filename, destination;
  return _regenerator["default"].async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (description) {
            _context.next = 2;
            break;
          }

          throw new Error("Missing parameter: description");

        case 2:
          _context.next = 4;
          return _regenerator["default"].awrap(migrationsDir.shouldExist());

        case 4:
          source = path.join(__dirname, "../../samples/migration.js");
          filename = "".concat(date.nowAsString(), "-").concat(description.split(" ").join("_"), ".js");
          _context.t0 = path;
          _context.next = 9;
          return _regenerator["default"].awrap(migrationsDir.resolve());

        case 9:
          _context.t1 = _context.sent;
          _context.t2 = filename;
          destination = _context.t0.join.call(_context.t0, _context.t1, _context.t2);
          _context.next = 14;
          return _regenerator["default"].awrap(fs.copy(source, destination));

        case 14:
          return _context.abrupt("return", filename);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
};