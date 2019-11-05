"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var fs = require("fs-extra");

var path = require("path");

var migrationsDir = require("../env/migrationsDir");

var configFile = require("../env/configFile");

function copySampleConfigFile() {
  var source = path.join(__dirname, "../../samples/migrate-mongo-config.js");
  var destination = path.join(process.cwd(), configFile.DEFAULT_CONFIG_FILE_NAME);
  return fs.copy(source, destination);
}

function createMigrationsDirectory() {
  return fs.mkdirs(path.join(process.cwd(), "migrations"));
}

module.exports = function _callee() {
  return _regenerator["default"].async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator["default"].awrap(migrationsDir.shouldNotExist());

        case 2:
          _context.next = 4;
          return _regenerator["default"].awrap(configFile.shouldNotExist());

        case 4:
          _context.next = 6;
          return _regenerator["default"].awrap(copySampleConfigFile());

        case 6:
          return _context.abrupt("return", createMigrationsDirectory());

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};