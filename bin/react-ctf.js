#!/usr/bin/env node

const argv = require("yargs").argv;
require = require("esm")(module);
module.exports = require("../src/cli").cli(argv);
