module.exports = [
  gateway
]

function gateway(err, res) {
  return !!~[502, 503, 504].indexOf(res.statusCode)
}

