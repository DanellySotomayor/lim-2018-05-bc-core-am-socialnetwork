const assert = require('chai').assert;
global.window = global;
global.firebase = require('firebase');
require('../src/app.js');
require('./socialnetwork.spec.js');
