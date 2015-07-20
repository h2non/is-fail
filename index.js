var error = require('./lib/errors')
var status = require('./lib/status')

module.exports = function (strategies) {
  var nativeStrategies = error.concat(status)

  if (strategies) {
    nativeStrategies = nativeStrategies.concat(strategies)
  }

  return function isFail(err, res) {
    return nativeStrategies.some(function (strategy) {
     return strategy(err, res)
    })
  }
}
