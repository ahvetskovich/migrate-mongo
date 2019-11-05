"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var resolveMigrationsDirPath = function resolveMigrationsDirPath(migrationDir) {
  return _path["default"].isAbsolute(migrationDir) ? migrationDir : _path["default"].join(process.cwd(), migrationDir);
};

var _default = resolveMigrationsDirPath;
exports["default"] = _default;