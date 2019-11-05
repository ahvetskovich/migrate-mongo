"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _up = _interopRequireDefault(require("./instance_methods/up"));

var _down = _interopRequireDefault(require("./instance_methods/down"));

var _status = _interopRequireDefault(require("./instance_methods/status"));

var _database = _interopRequireDefault(require("./instance_methods/database"));

var MigrateMongo = function MigrateMongo(config) {
  (0, _classCallCheck2["default"])(this, MigrateMongo);
  this.config = config;
  var statusWithConfig = (0, _status["default"])(config);
  this.up = (0, _up["default"])(config, statusWithConfig);
  this.down = (0, _down["default"])(config, statusWithConfig);
  this.status = statusWithConfig;
  this.database = (0, _database["default"])(config);
};

module.exports = MigrateMongo;