global.window = global;
global.assert = require("chai").assert;

// require("../src/data");
require('../src/app.js');
require('./socialnetwork.spec.js');