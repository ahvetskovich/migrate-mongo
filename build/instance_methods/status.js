"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _lodash = require("lodash");

var _getFileNames = _interopRequireDefault(require("../utils/getFileNames"));

var status = function status(config) {
  return function _callee(db) {
    var fileNames, collectionName, collection, changelog, statusTable;
    return _regenerator["default"].async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _regenerator["default"].awrap((0, _getFileNames["default"])(config.migrationsDir));

          case 2:
            fileNames = _context.sent;
            collectionName = "changelog";

            if (config.changelogCollectionName) {
              collectionName = config.changelogCollectionName;
            } else {
              collectionName = "changelog"; // eslint-disable-next-line no-console

              console.warn('No changelogCollectionName found in config - defaulting to "changelog"');
            }

            collection = db.collection(collectionName);
            _context.next = 8;
            return _regenerator["default"].awrap(collection.find({}).toArray());

          case 8:
            changelog = _context.sent;
            statusTable = fileNames.map(function (fileName) {
              var itemInLog = (0, _lodash.find)(changelog, {
                fileName: fileName
              });
              var appliedAt = itemInLog ? itemInLog.appliedAt.toJSON() : "PENDING";
              return {
                fileName: fileName,
                appliedAt: appliedAt
              };
            });
            return _context.abrupt("return", statusTable);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    });
  };
};

var _default = status;
exports["default"] = _default;