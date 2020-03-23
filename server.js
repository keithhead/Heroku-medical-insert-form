var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.static('public'));
app.use(bodyParser.json());

var nforce = require('nforce');

var org = nforce.createConnection({
  clientId: '3MVG9G9pzCUSkzZtzL9w0ddPTxvREi8INdGWwqqEXmesmLTvLPters6NbZ4vMeFHJ__EDI.YP2GGJlygl1_NJ',
  clientSecret: '5F56E8E7D30C4FF1583E8194CF5D73BBB65CA797FACA8358C0F68AF49285E841',
  redirectUri: 'https://login.salesforce.com/oauth2/callback',
});

var oauth;

org.authenticate({ username: 'king.lai@playful-goat-5h00v6.com', password: 'S6tw1515', securityToken: 'WmSDOZZzVO2GxapgaOnoqm17' }, function(err, resp){
  // the oauth object was stored in the connection object
  
  if(!err) {
    console.log('RESP: ' + JSON.stringify(resp));
    console.log('Access Token: ' + resp.access_token);
    oauth = resp;
  } else {
    console.log('Error: ' + err.message);
  }
});

app.post('/addData', function(req, res) {
    var acc = nforce.createSObject('Account');
    acc.set('Name', req.body.name);
    acc.set('Phone', '800-555-2345');

    org.insert({ sobject: acc, oauth: oauth }, function(err, resp){
      if(!err) console.log('It worked!');
      res.json(resp);
    });
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
