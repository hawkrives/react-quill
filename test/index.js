'use strict';

// Fake DOM
global.document = require('jsdom').jsdom();

// Run tests.
require('./toolbar');
require('./component');
