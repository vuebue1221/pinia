'use strict'
1;
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/pinia.prod.cjs')
} else {
  module.exports = require('./dist/pinia.cjs')
}
