var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var app = express();
var nforce = require('nforce');
var chatter = require('nforce-chatter')(nforce);
var jsforce = require('jsforce');
var oauth;

app.set('port', process.env.PORT || 5000);
app.use(express.static('public'));
app.use(bodyParser.json());
/*
var org = nforce.createConnection({
  clientId: '3MVG9G9pzCUSkzZs3g2TYsOpgn9hsinhjm2vDfQpI_VVRK3E3V4E.9synPARSsrriKC58K47OyctfhZ60kJAt',
  clientSecret: 'E11C84E8ADA88C419068838F3E17ACF1E27C31273D3DDAFA168B7A3CB8D9B930',
  redirectUri: 'https://login.salesforce.com/oauth2/callback',
  plugins: ['chatter']
});

org.authenticate({ username: 'keith.ng@k-su19.demo', password: 'salesforce1', securityToken: '27oCbWWf4v5EAwliCXTBsj8Q' }, function(err, resp){
  // the oauth object was stored in the connection object
  if(!err) {
    console.log('RESP: ' + JSON.stringify(resp));
    console.log('Access Token: ' + resp.access_token);
    oauth = resp;
  } else {
    console.log('Error: ' + err.message);
  }
});
*/
var conn = new jsforce.Connection({
  oauth2 : {
    // you can change loginUrl to connect to sandbox or prerelease env.
    // loginUrl : 'https://test.salesforce.com',
    clientId : '3MVG9G9pzCUSkzZs3g2TYsOpgn9hsinhjm2vDfQpI_VVRK3E3V4E.9synPARSsrriKC58K47OyctfhZ60kJAt',
    clientSecret : 'E11C84E8ADA88C419068838F3E17ACF1E27C31273D3DDAFA168B7A3CB8D9B930',
    redirectUri : 'https://login.salesforce.com/oauth2/callback'
  }
});
conn.login(username: 'keith.ng@k-su19.demo', password: 'salesforce127oCbWWf4v5EAwliCXTBsj8Q', function(err, userInfo) {
  if (err) { return console.error(err); }
  // Now you can get the access token and instance URL information.
  // Save them to establish connection next time.
  console.log(conn.accessToken);
  console.log(conn.instanceUrl);
  // logged in user property
  console.log("User ID: " + userInfo.id);
  console.log("Org ID: " + userInfo.organizationId);
  // ...
});
app.post('/addData', function(req, res) {
  /*
    var acc = nforce.createSObject('Account');
    acc.set('Name', req.body.name);
    acc.set('Phone', req.body.phone);

  
    org.insert({ sobject: acc, oauth: oauth }, function(err, resp){
      if(!err) console.log('It worked!');
      res.json(resp);
    });
  
  org.chatter.postFeedItem({id: '0012v00002tHMLDAA4', text: 'My Awesome Post!!', oauth:oauth}, function(err, resp) {
      if (!err) console.log(resp);
      res.json(resp);
  });
  */
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
