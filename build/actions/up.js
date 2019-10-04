"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require("lodash");
var pEachSeries = require("p-each-series");
var fnArgs = require("fn-args");

var _require = require("util"),
    promisify = _require.promisify;

var status = require("./status");

var configFile = require("../env/configFile");
var migrationsDir = require("../env/migrationsDir");

module.exports = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(db) {
    var statusItems, pendingItems, migrated, migrateItem;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return status(db);

          case 2:
            statusItems = _context2.sent;
            pendingItems = _.filter(statusItems, { appliedAt: "PENDING" });
            migrated = [];

            migrateItem = function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(item) {
                var migration, args, up, error, config, collectionName, collection, fileName, appliedAt;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return migrationsDir.loadMigration(item.fileName);

                      case 3:
                        migration = _context.sent;
                        args = fnArgs(migration.up);
                        up = args.length > 1 ? promisify(migration.up) : migration.up;
                        _context.next = 8;
                        return up(db);

                      case 8:
                        _context.next = 15;
                        break;

                      case 10:
                        _context.prev = 10;
                        _context.t0 = _context["catch"](0);
                        error = new Error("Could not migrate up " + item.fileName + ": " + _context.t0.message);

                        error.migrated = migrated;
                        throw error;

                      case 15:
                        _context.next = 17;
                        return configFile.read();

                      case 17:
                        config = _context.sent;
                        collectionName = config.changelogCollectionName;
                        collection = db.collection(collectionName);
                        fileName = item.fileName;
                        appliedAt = new Date();
                        _context.prev = 22;
                        _context.next = 25;
                        return collection.insertOne({ fileName: fileName, appliedAt: appliedAt });

                      case 25:
                        _context.next = 30;
                        break;

                      case 27:
                        _context.prev = 27;
                        _context.t1 = _context["catch"](22);
                        throw new Error("Could not update changelog: " + _context.t1.message);

                      case 30:
                        migrated.push(item.fileName);

                      case 31:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, undefined, [[0, 10], [22, 27]]);
              }));

              return function migrateItem(_x2) {
                return _ref2.apply(this, arguments);
              };
            }();

            _context2.next = 8;
            return pEachSeries(pendingItems, migrateItem);

          case 8:
            return _context2.abrupt("return", migrated);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();