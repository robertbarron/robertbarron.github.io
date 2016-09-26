var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	busboy = require('connect-busboy'),
	fs = require('fs'),
	server = require('http').createServer(app);


/* PARSEADOR DE REQUESTS */
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.use(busboy());

/* SERVER STATIC REPOSITORIES */
app.use('/data', express.static('./data') );
app.use('/fonts', express.static('./app/css/fonts') );
app.use('/css', express.static('./app/css/') );
app.use('/images', express.static('./app/images') );
app.use('/js', express.static('./app/js') );
app.use('/templates', express.static('./app/templates') );
app.use('/videos', express.static('./app/videos') );
app.use('/fontello', express.static('./vendors/fontello/') );

/* ROUTES */

app.get('/', function(req, res) {
	res.sendFile( __dirname + '/app/index.html');
});

/* API */
	/* test if username is already taken*/
app.get('/portfolio', function(req, res) {

});

server.listen(process.env.PORT || 5000);