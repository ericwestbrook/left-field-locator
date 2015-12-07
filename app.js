// load in modules
var express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    path = require('path');


// set up express
var app = express();


// public directory
app.use(express.static(path.join(__dirname, 'public')));


// parse json requests
app.use(bodyParser.json());


// error handling.
// only handle `next(err)` calls
app.use(function(err, req, res, next) {
    if (err) {
        console.log(err);
        res.send({success: false});
    }
});


// node-geocoder setup
var geocoderProvider = 'google';
var httpAdapter = 'https';
var geoOpts = {
    apiKey: 'AIzaSyCAX7EfGE6AKuQU52gpOq1FcQ-4VaCVbYc'
};
var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, geoOpts);


// Routes
app.post('/api/locations-from-addresses', function (req, res, next) {
    var addresses = req.body.compare;
    addresses.push(req.body.home);
    geocoder.batchGeocode(addresses, function (err, results) {
        if (err) {
            console.log('error', err);
            res.send({error: 'unable to geocode locations...'});
        } else {
            var returnResults = {
                home: '',
                compare: []
            };
            for (var i = 0; i < results.length; i++) {
                if (i == results.length - 1) {
                    // if last result, it is the home location
                    returnResults.home = results[i].value[0];
                }
                else {
                    // otherwise add to list to compare to
                    returnResults.compare.push(results[i].value[0]);
                }
            }
            res.send(returnResults);
        }
    });
});


//set the port
var app_port = process.env.PORT || 3000;
app.set('port', app_port);


// listen up.
http.createServer(app).listen(app.get('port'), function(){
    console.log('Running... (port: ' + app_port + ')');
});


module.exports = app;