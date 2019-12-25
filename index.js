var express = require('express')
var app = express()
var path = require('path');
var SquareConnect = require('square-connect');
var apiInstance = new SquareConnect.OAuthApi();
var defaultClient = SquareConnect.ApiClient.instance;
var api = new SquareConnect.LocationsApi();
var body = new SquareConnect.ObtainTokenRequest();

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/callback', function (req,res) {

// Configure OAuth2 access token for authorization: oauth2
var oauth2 = defaultClient.authentications['oauth2'];

body.client_id = "sq0idp-xIr3knD-qmi3guptnnEPhw";
body.client_secret = "sq0csp-xErZqO8pz9Hq-iIVsRBkgDIV9I5GUTbWaQML7cdI64E"
body.grant_type = "authorization_code"
body.code = req.query.code

apiInstance.obtainToken(body).then(function(data) {
    console.log('API called successfully. Returned token: ' + JSON.stringify(data.access_token, 0, 1));
    oauth2.accessToken = data.access_token

    api.listLocations().then(function(data) {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data, 0, 1));
      }, function(error) {
        console.error(error);
      });
      res.sendStatus(200);
      })
  }, function(error) {
    console.error(error);
});

app.listen(3000)