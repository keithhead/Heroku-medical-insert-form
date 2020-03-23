var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var nforce = require('nforce');

var app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.static('public'));
app.use(bodyParser.json());
//app.use("/static", express.static('./static/'));
// app.use('/static', express.static(__dirname + '/Samples/DataSources'));

// app.get('/', function(req,res) {
//   res.send(browserRefresh('datasources.html'));
// });

// function browserRefresh(filePath) {
//   var html = fs.readFileSync(filePath);
//   var $ = cheerio.load(html);
//   $('body').append('<script src="${process.env.BROWSER_REFRESH_URL}"></script>');
//   return $.html();
// }

app.post('/update', function(req, res) {
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
        // watch for any connect issues
        if (err) console.log(err);
        conn.query(
            'UPDATE salesforce.Contact SET Phone = $1, MobilePhone = $1 WHERE LOWER(FirstName) = LOWER($2) AND LOWER(LastName) = LOWER($3) AND LOWER(Email) = LOWER($4)',
            [req.body.phone.trim(), req.body.firstName.trim(), req.body.lastName.trim(), req.body.email.trim()],
            function(err, result) {
                if (err != null || result.rowCount == 0) {
                  conn.query('INSERT INTO salesforce.Contact (Phone, MobilePhone, FirstName, LastName, Email) VALUES ($1, $2, $3, $4, $5)',
                  [req.body.phone.trim(), req.body.phone.trim(), req.body.firstName.trim(), req.body.lastName.trim(), req.body.email.trim()],
                  function(err, result) {
                    done();
                    if (err) {
                        res.status(400).json({error: err.message});
                    }
                    else {
                        // this will still cause jquery to display 'Record updated!'
                        // eventhough it was inserted
                        res.json(result);
                    }
                  });
                }
                else {
                    done();
                    res.json(result);
                }
            }
        );
    });
});

app.post('/search', function(req, res) {
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
        // watch for any connect issues
//'SELECT * FROM salesforce.Medical__c WHERE Name__c = $1 OR Company_Name__c = $2 OR Phone__c = $3',        
//  'SELECT * FROM salesforce.Medical__c WHERE (Name__c = $1 OR $1 IS NULL) AND (Company_Name__c = $2 OR $2 IS NULL) AND (Phone__c = $3 OR $3 IS NULL)',
        if (err) console.log(err);
        conn.query(
            'SELECT * FROM salesforce.Medical__c WHERE (Name__c = $1 OR $1 = \'\') AND (Company_Name__c = $2 OR $2 = \'\') AND (Phone__c = $3 OR $3 = \'\')',
            [req.body.name.trim(), req.body.companyName.trim(), req.body.phone.trim()],
            function(err, result) {
                done();
                if (err) {
                    res.status(400).json({error: err.message});
                }
                else {
                    res.json(result);
                }
            }
        );
    });
});

app.post('/insert', function(req, res) {
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
        // watch for any connect issues
        if (err) console.log(err);
        conn.query(
            'INSERT INTO salesforce.Medical__c (Name__c, Phone__c, Temperature__c, Company_Name__c, Signature__c) VALUES ($1, $2, $3, $4, $5)',
            [req.body.name.trim(), req.body.phone.trim(), req.body.temperature.trim(), req.body.companyName.trim(), req.body.dataURL.trim()],
            function(err, result) {
                done();
                if (err) {
                    res.status(400).json({error: err.message});
                }
                else {
                    res.json(result);
                }
            }
        );
    });
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
