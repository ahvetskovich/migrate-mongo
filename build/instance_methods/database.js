"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _mongodb = require("mongodb");

var database = function database(config) {
  return {
    connect: function connect() {
      var _config$mongodb, url, databaseName, options, client, db;

      return _regenerator["default"].async(function connect$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _config$mongodb = config.mongodb, url = _config$mongodb.url, databaseName = _config$mongodb.databaseName, options = _config$mongodb.options;

              if (url) {
                _context.next = 3;
                break;
              }

              throw new Error("No `url` defined in config file!");

            case 3:
              if (databaseName) {
                _context.next = 5;
                break;
              }

              throw new Error("No `databaseName` defined in config file! This is required since migrate-mongo v3. " + "See https://github.com/seppevs/migrate-mongo#initialize-a-new-project");

            case 5:
              _context.next = 7;
              return _regenerator["default"].awrap(_mongodb.MongoClient.connect(url, options));

            case 7:
              client = _context.sent;
              db = client.db(databaseName);
              db.close = client.close.bind(client);
              return _context.abrupt("return", db);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  };
};

var _default = database;
exports["default"] = _default;