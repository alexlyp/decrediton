"use strict";
const dexc = require("./build/Release/dexc.node");

module.exports.callDEX = function (func, params) {
  return dexc.call(
    JSON.stringify({
      function: func,
      params: params
    })
  );
};
