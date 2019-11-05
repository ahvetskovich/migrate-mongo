"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _resolveMigrationsDirPath = _interopRequireDefault(require("./resolveMigrationsDirPath"));

var getFileNames = function getFileNames(migrationsDirPath) {
  var migrationsDir, files;
  return _regenerator["default"].async(function getFileNames$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          migrationsDir = (0, _resolveMigrationsDirPath["default"])(migrationsDirPath);
          _context.next = 3;
          return _regenerator["default"].awrap(new _promise["default"](function (resolve, reject) {
            return _fs["default"].readdir(migrationsDir, function (err, fileList) {
              if (!err) {
                resolve(fileList);
              } else {
                reject(err);
              }
            });
          }));

        case 3:
          files = _context.sent;
          return _context.abrupt("return", files.filter(function (file) {
            return _path["default"].extname(file) === ".js";
          }));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var _default = getFileNames;
exports["default"] = _default;