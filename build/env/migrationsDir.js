"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var fs = require("fs-extra");

var path = require("path");

var configFile = require("./configFile");

var DEFAULT_MIGRATIONS_DIR_NAME = "migrations";

function resolveMigrationsDirPath() {
  var migrationsDir, config;
  return _regenerator["default"].async(function resolveMigrationsDirPath$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _regenerator["default"].awrap(configFile.read());

        case 3:
          config = _context.sent;
          migrationsDir = config.migrationsDir; // eslint-disable-line
          // if config file doesn't have migrationsDir key, assume default 'migrations' dir

          if (!migrationsDir) {
            migrationsDir = DEFAULT_MIGRATIONS_DIR_NAME;
          }

          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          // config file could not be read, assume default 'migrations' dir
          migrationsDir = DEFAULT_MIGRATIONS_DIR_NAME;

        case 11:
          if (!path.isAbsolute(migrationsDir)) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", migrationsDir);

        case 13:
          return _context.abrupt("return", path.join(process.cwd(), migrationsDir));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

module.exports = {
  resolve: resolveMigrationsDirPath,
  shouldExist: function shouldExist() {
    var migrationsDir;
    return _regenerator["default"].async(function shouldExist$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _regenerator["default"].awrap(resolveMigrationsDirPath());

          case 2:
            migrationsDir = _context2.sent;
            _context2.prev = 3;
            _context2.next = 6;
            return _regenerator["default"].awrap(fs.stat(migrationsDir));

          case 6:
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](3);
            throw new Error("migrations directory does not exist: ".concat(migrationsDir));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[3, 8]]);
  },
  shouldNotExist: function shouldNotExist() {
    var migrationsDir, error;
    return _regenerator["default"].async(function shouldNotExist$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _regenerator["default"].awrap(resolveMigrationsDirPath());

          case 2:
            migrationsDir = _context3.sent;
            error = new Error("migrations directory already exists: ".concat(migrationsDir));
            _context3.prev = 4;
            _context3.next = 7;
            return _regenerator["default"].awrap(fs.stat(migrationsDir));

          case 7:
            throw error;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](4);

            if (!(_context3.t0.code !== "ENOENT")) {
              _context3.next = 14;
              break;
            }

            throw error;

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[4, 10]]);
  },
  getFileNames: function getFileNames() {
    var migrationsDir, files;
    return _regenerator["default"].async(function getFileNames$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _regenerator["default"].awrap(resolveMigrationsDirPath());

          case 2:
            migrationsDir = _context4.sent;
            _context4.next = 5;
            return _regenerator["default"].awrap(fs.readdir(migrationsDir));

          case 5:
            files = _context4.sent;
            return _context4.abrupt("return", files.filter(function (file) {
              return path.extname(file) === ".js";
            }));

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  loadMigration: function loadMigration(fileName) {
    var migrationsDir;
    return _regenerator["default"].async(function loadMigration$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _regenerator["default"].awrap(resolveMigrationsDirPath());

          case 2:
            migrationsDir = _context5.sent;
            return _context5.abrupt("return", require(path.join(migrationsDir, fileName)));

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    });
  }
};