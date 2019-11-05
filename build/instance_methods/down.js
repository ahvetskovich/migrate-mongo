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

var fnArgs = require("fn-args");

var _require = require("util"),
    promisify = _require.promisify;

var _default = function _default(config, status) {
  return function _callee(db) {
    var downgraded, statusItems, appliedItems, lastAppliedItem, migration, args, down, collectionName, collection;
    return _regenerator["default"].async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            downgraded = [];
            _context.next = 3;
            return _regenerator["default"].awrap(status(db, config));

          case 3:
            statusItems = _context.sent;
            appliedItems = statusItems.filter(function (item) {
              return item.appliedAt !== "PENDING";
            });
            lastAppliedItem = _.last(appliedItems);

            if (!lastAppliedItem) {
              _context.next = 29;
              break;
            }

            _context.prev = 7;
            migration = (0, _loadMigration["default"])(config.migrationDir, lastAppliedItem.fileName);
            args = fnArgs(migration.down);
            down = args.length > 1 ? promisify(migration.down) : migration.down;
            _context.next = 13;
            return _regenerator["default"].awrap(down(db));

          case 13:
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](7);
            throw new Error("Could not migrate down ".concat(lastAppliedItem.fileName, ": ").concat(_context.t0.message));

          case 18:
            collectionName = config.changelogCollectionName;
            collection = db.collection(collectionName);
            _context.prev = 20;
            _context.next = 23;
            return _regenerator["default"].awrap(collection.deleteOne({
              fileName: lastAppliedItem.fileName
            }));

          case 23:
            downgraded.push(lastAppliedItem.fileName);
            _context.next = 29;
            break;

          case 26:
            _context.prev = 26;
            _context.t1 = _context["catch"](20);
            throw new Error("Could not update changelog: ".concat(_context.t1.message));

          case 29:
            return _context.abrupt("return", downgraded);

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[7, 15], [20, 26]]);
  };
};

exports["default"] = _default;