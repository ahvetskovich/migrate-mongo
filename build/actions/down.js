"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _ = require("lodash");

var fnArgs = require("fn-args");

var _require = require("util"),
    promisify = _require.promisify;

var status = require("./status");

var configFile = require("../env/configFile");

var migrationsDir = require("../env/migrationsDir");

module.exports = function _callee(db) {
  var downgraded, statusItems, appliedItems, lastAppliedItem, migration, args, down, config, collectionName, collection;
  return _regenerator["default"].async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          downgraded = [];
          _context.next = 3;
          return _regenerator["default"].awrap(status(db));

        case 3:
          statusItems = _context.sent;
          appliedItems = statusItems.filter(function (item) {
            return item.appliedAt !== "PENDING";
          });
          lastAppliedItem = _.last(appliedItems);

          if (!lastAppliedItem) {
            _context.next = 34;
            break;
          }

          _context.prev = 7;
          _context.next = 10;
          return _regenerator["default"].awrap(migrationsDir.loadMigration(lastAppliedItem.fileName));

        case 10:
          migration = _context.sent;
          args = fnArgs(migration.down);
          down = args.length > 1 ? promisify(migration.down) : migration.down;
          _context.next = 15;
          return _regenerator["default"].awrap(down(db));

        case 15:
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](7);
          throw new Error("Could not migrate down ".concat(lastAppliedItem.fileName, ": ").concat(_context.t0.message));

        case 20:
          _context.next = 22;
          return _regenerator["default"].awrap(configFile.read());

        case 22:
          config = _context.sent;
          collectionName = config.changelogCollectionName;
          collection = db.collection(collectionName);
          _context.prev = 25;
          _context.next = 28;
          return _regenerator["default"].awrap(collection.deleteOne({
            fileName: lastAppliedItem.fileName
          }));

        case 28:
          downgraded.push(lastAppliedItem.fileName);
          _context.next = 34;
          break;

        case 31:
          _context.prev = 31;
          _context.t1 = _context["catch"](25);
          throw new Error("Could not update changelog: ".concat(_context.t1.message));

        case 34:
          return _context.abrupt("return", downgraded);

        case 35:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[7, 17], [25, 31]]);
};