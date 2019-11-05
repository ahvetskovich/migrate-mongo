"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var fs = require("fs-extra");

var path = require("path");

var _require = require("lodash"),
    get = _require.get;

var DEFAULT_CONFIG_FILE_NAME = "migrate-mongo-config.js";

function getConfigPath() {
  var fileOptionValue = get(global.options, "file");

  if (!fileOptionValue) {
    return path.join(process.cwd(), DEFAULT_CONFIG_FILE_NAME);
  }

  if (path.isAbsolute(fileOptionValue)) {
    return fileOptionValue;
  }

  return path.join(process.cwd(), fileOptionValue);
}

module.exports = {
  DEFAULT_CONFIG_FILE_NAME: DEFAULT_CONFIG_FILE_NAME,
  shouldExist: function shouldExist() {
    var configPath;
    return _regenerator["default"].async(function shouldExist$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            configPath = getConfigPath();
            _context.prev = 1;
            _context.next = 4;
            return _regenerator["default"].awrap(fs.stat(configPath));

          case 4:
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](1);
            throw new Error("config file does not exist: ".concat(configPath));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 6]]);
  },
  shouldNotExist: function shouldNotExist() {
    var configPath, error;
    return _regenerator["default"].async(function shouldNotExist$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            configPath = getConfigPath();
            error = new Error("config file already exists: ".concat(configPath));
            _context2.prev = 2;
            _context2.next = 5;
            return _regenerator["default"].awrap(fs.stat(configPath));

          case 5:
            throw error;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);

            if (!(_context2.t0.code !== "ENOENT")) {
              _context2.next = 12;
              break;
            }

            throw error;

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[2, 8]]);
  },
  getConfigFilename: function getConfigFilename() {
    return path.basename(getConfigPath());
  },
  read: function read() {
    var configPath;
    return _regenerator["default"].async(function read$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            configPath = getConfigPath();
            return _context3.abrupt("return", _promise["default"].resolve(require(configPath)));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    });
  }
};