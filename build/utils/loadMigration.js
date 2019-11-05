"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _resolveMigrationsDirPath = _interopRequireDefault(require("./resolveMigrationsDirPath"));

var loadMigration = function loadMigration(migrationsDirPath, fileName) {
  if (!migrationsDirPath) {
    throw new Error("No migrations path found");
  }

  var filePath = _path["default"].join((0, _resolveMigrationsDirPath["default"])(migrationsDirPath), fileName); // eslint-disable-next-line


  return require(filePath);
};

var _default = loadMigration;
exports["default"] = _default;