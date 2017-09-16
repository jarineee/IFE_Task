var express = require('express'),
  config = require('./config/index'),
  port = process.env.PORT || config.build.port,
  app = express(),
  router = express.Router();

router.get('./', function (req, res, next) {
	req.url = '/index.html';
	next();
});

app.use(router);

var appData = require('./data.json'),
  dataSell = appData.seller,
  dataGoods = appData.goods,
  dataRate = appData.ratings,
  apiRoutes = express.Router();

apiRoutes.get('/dataSell', function (req, res) {
	res.json({
		errno: 0,
		data: dataSell
	});
});

apiRoutes.get('/dataGoods', function (req, res) {
	res.json({
		errno: 0,
		data: dataGoods
	});
});

apiRoutes.get('/dataRate', function (req, res) {
	res.json({
		errno: 0,
		data: dataRate
	});
});

app.use('/api', apiRoutes);
app.use(express.static('./dist'));

var uri = 'http://localhost:' + port;

var _resolve;
var readyPromise = new Promise(resolve => {
  _resolve = resolve
});

console.log('> Starting dev server...');
console.log('> Listening at ' + uri + '\n')

var server = app.listen(port);

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
};