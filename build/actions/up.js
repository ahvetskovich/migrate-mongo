"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _ = require("lodash");

var pEachSeries = require("p-each-series");

var fnArgs = require("fn-args");

var _require = require("util"),
    promisify = _require.promisify;

var status = require("./status");

var configFile = require("../env/configFile");

var migrationsDir = require("../env/migrationsDir");

module.exports = function _callee(db) {
  var statusItems, pendingItems, migrated, migrateItem;
  return _regenerator["default"].async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _regenerator["default"].awrap(status(db));

        case 2:
          statusItems = _context2.sent;
          pendingItems = _.filter(statusItems, {
            appliedAt: "PENDING"
          });
          migrated = [];

          migrateItem = function migrateItem(item) {
            var migration, args, up, error, config, collectionName, collection, fileName, appliedAt;
            return _regenerator["default"].async(function migrateItem$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return _regenerator["default"].awrap(migrationsDir.loadMigration(item.fileName));

                  case 3:
                    migration = _context.sent;
                    args = fnArgs(migration.up);
                    up = args.length > 1 ? promisify(migration.up) : migration.up;
                    _context.next = 8;
                    return _regenerator["default"].awrap(up(db));

                  case 8:
                    _context.next = 15;
                    break;

                  case 10:
                    _context.prev = 10;
                    _context.t0 = _context["catch"](0);
                    error = new Error("Could not migrate up ".concat(item.fileName, ": ").concat(_context.t0.message));
                    error.migrated = migrated;
                    throw error;

                  case 15:
                    _context.next = 17;
                    return _regenerator["default"].awrap(configFile.read());

                  case 17:
                    config = _context.sent;
                    collectionName = config.changelogCollectionName;
                    collection = db.collection(collectionName);
                    fileName = item.fileName;
                    appliedAt = new Date();
                    _context.prev = 22;
                    _context.next = 25;
                    return _regenerator["default"].awrap(collection.insertOne({
                      fileName: fileName,
                      appliedAt: appliedAt
                    }));

                  case 25:
                    _context.next = 30;
                    break;

                  case 27:
                    _context.prev = 27;
                    _context.t1 = _context["catch"](22);
                    throw new Error("Could not update changelog: ".concat(_context.t1.message));

                  case 30:
                    migrated.push(item.fileName);

                  case 31:
                  case "end":
                    return _context.stop();
                }
              }
            }, null, null, [[0, 10], [22, 27]]);
          };

          _context2.next = 8;
          return _regenerator["default"].awrap(pEachSeries(pendingItems, migrateItem));

        case 8:
          return _context2.abrupt("return", migrated);

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
};