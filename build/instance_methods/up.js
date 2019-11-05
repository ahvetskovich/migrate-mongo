"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _loadMigration = _interopRequireDefault(require("../utils/loadMigration"));

var _ = require("lodash");

var pEachSeries = require("p-each-series");

var fnArgs = require("fn-args");

var _require = require("util"),
    promisify = _require.promisify;

var _default = function _default(config, status) {
  return function _callee(db) {
    var statusItems, pendingItems, migrated, migrateItem;
    return _regenerator["default"].async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _regenerator["default"].awrap(status(db, config));

          case 2:
            statusItems = _context2.sent;
            pendingItems = _.filter(statusItems, {
              appliedAt: "PENDING"
            });
            migrated = [];

            migrateItem = function migrateItem(item) {
              var migration, args, up, error, collectionName, collection, fileName, appliedAt;
              return _regenerator["default"].async(function migrateItem$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.prev = 0;
                      migration = (0, _loadMigration["default"])(config.migrationsDir, item.fileName);
                      args = fnArgs(migration.up);
                      up = args.length > 1 ? promisify(migration.up) : migration.up;
                      _context.next = 6;
                      return _regenerator["default"].awrap(up(db));

                    case 6:
                      _context.next = 13;
                      break;

                    case 8:
                      _context.prev = 8;
                      _context.t0 = _context["catch"](0);
                      error = new Error("Could not migrate up ".concat(item.fileName, ": ").concat(_context.t0.message));
                      error.migrated = migrated;
                      throw error;

                    case 13:
                      if (config.changelogCollectionName) {
                        collectionName = config.changelogCollectionName;
                      } else {
                        collectionName = "changelog"; // eslint-disable-next-line no-console

                        console.warn('No changelogCollectionName found in config - defaulting to "changelog"');
                      }

                      collection = db.collection(collectionName);
                      fileName = item.fileName;
                      appliedAt = new Date();
                      _context.prev = 17;
                      _context.next = 20;
                      return _regenerator["default"].awrap(collection.insertOne({
                        fileName: fileName,
                        appliedAt: appliedAt
                      }));

                    case 20:
                      _context.next = 25;
                      break;

                    case 22:
                      _context.prev = 22;
                      _context.t1 = _context["catch"](17);
                      throw new Error("Could not update changelog: ".concat(_context.t1.message));

                    case 25:
                      migrated.push(item.fileName);

                    case 26:
                    case "end":
                      return _context.stop();
                  }
                }
              }, null, null, [[0, 8], [17, 22]]);
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
};

exports["default"] = _default;