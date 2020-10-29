"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// eslint-disable-next-line no-undef
var app = (0, _express["default"])();
var PORT = 5000;
app.get('/', home);
app.post('/info', info);
app.use(apiNotFound);

function home(req, res) {
  res.status(200).json({
    name: 'PASV',
    age: 5
  });
}

function info(req, res) {
  var a = 123;
  var b = Math.random();
  var c = a + b;
  res.send('Info is here' + c);
}

function apiNotFound(req, res) {
  res.status(400).send('API not Found');
}

app.listen(PORT, function () {
  console.log("Example app listening at http://localhost:".concat(PORT));
});