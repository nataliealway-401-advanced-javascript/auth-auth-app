'use strict';
require('dotenv').config();


require('./src/server.js/index.js').start(process.env.PORT);