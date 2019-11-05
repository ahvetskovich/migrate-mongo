"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _require = require("lodash"),
    find = _require.find;

var migrationsDir = require("../env/migrationsDir");

var configFile = require("../env/configFile");

module.exports = function _callee(db) {
  var fileNames, config, collectionName, collection, changelog, statusTable;
  return _regenerator["default"].async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator["default"].awrap(migrationsDir.shouldExist());

        case 2:
          _context.next = 4;
          return _regenerator["default"].awrap(configFile.shouldExist());

        case 4:
          _context.next = 6;
          return _regenerator["default"].awrap(migrationsDir.getFileNames());

        case 6:
          fileNames = _context.sent;
          _context.next = 9;
          return _regenerator["default"].awrap(configFile.read());

        case 9:
          config = _context.sent;
          collectionName = config.changelogCollectionName;
          collection = db.collection(collectionName);
          _context.next = 14;
          return _regenerator["default"].awrap(collection.find({}).toArray());

        case 14:
          changelog = _context.sent;
          statusTable = fileNames.map(function (fileName) {
            var itemInLog = find(changelog, {
              fileName: fileName
            });
            var appliedAt = itemInLog ? itemInLog.appliedAt.toJSON() : "PENDING";
            return {
              fileName: fileName,
              appliedAt: appliedAt
            };
          });
          return _context.abrupt("return", statusTable);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
};