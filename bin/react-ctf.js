#!/usr/bin/env node

const argv = require("yargs").argv;
//require = require("esm")(module);
require("../src/cli").cli(argv);
