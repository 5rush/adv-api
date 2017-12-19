var express = require('express');
var bodyParser = require('body-parser');
var credentials = require('./credentials.js');

var app = express();
app.set('port', process.env.PORT || 3000);


app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

//restrict CORS only for paths starting with /api 
app.use('/api', require('cors')());

var mongoose = require('mongoose');
var opts = {
    server: {
       socketOptions: { keepAlive: 1 }
    }
};

switch(app.get('env')){
    case 'development':
        mongoose.connect(credentials.mongo.development.connectionString, opts);
        break;
    case 'production':
        mongoose.connect(credentials.mongo.production.connectionString, opts);
        break;
    default:
        throw new Error('Unknown execution environment: ' + app.get('env'));
}


var User = require('./models/user.js');

/*
Returns a list of users.
*/
app.get('/api/users', function(req, res){
    User.find({ isActive: true }, function(err, users){
        if(err) return res.status(500).send('Error occurred: database error.');
        res.json(users.map(function(a){
            return {
            	id: a._id,
    			email: a.email,
    			firstName: a.firstName,
    			lastName: a.lastName,
    			nationality: a.nationality,
    			phoneNumber: a.phoneNumber,
    			primaryAddress: a.primaryAddress
            }
        }));
    });
});

/* 
Creates an user. Takes email, first name, last name, nationality, phone number, primary address
(delivery address, postal code, city,	country) in the request body.
*/
app.post('/api/user', function(req, res){
    var a = new User({
		email: req.body.email,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		nationality: req.body.nationality,
		phoneNumber: req.body.phoneNumber,
		primaryAddress: { 
			deliveryAddress: req.body.primaryAddress.deliveryAddress,
        	postalCode: req.body.primaryAddress.postalCode,
    		city: req.body.primaryAddress.city,
        	country: req.body.primaryAddress.country
		},
		isActive: true
    });
    a.save(function(err, a){
        if(err) return res.status(500).send('Error occurred: database error.');
        res.json({ id: a._id });
    });
});

/*
Returns an user. Takes an user ID.
*/
app.get('/api/user/:id', function(req,res){
    User.findById(req.params.id, function(err, a){
        if(err) return res.status(500).send('Error occurred: database error.');
        if(!a.isActive) return res.status(404).send('Not Found');
        res.json({
        	id: a._id,
			email: a.email,
			firstName: a.firstName,
			lastName: a.lastName,
			nationality: a.nationality,
			phoneNumber: a.phoneNumber,
			primaryAddress: a.primaryAddress
        });
    });
});

/*
Updates an existing user. Takes an user ID, email, first name, last name, nationality, 
phone number, primary address(delivery address, postal code, city, country) in the request body.
*/
app.put('/api/user/:id', function(req,res){
    User.findById(req.params.id, function(err, a){
        if(err) return res.status(500).send('Error occurred: database error.');

		a.email = req.body.email;
		a.firstName = req.body.firstName;
		a.lastName = req.body.lastName;
		a.nationality = req.body.nationality;
		a.phoneNumber = req.body.phoneNumber;
		a.primaryAddress.deliveryAddress = req.body.primaryAddress.deliveryAddress;
    	a.primaryAddress.postalCode = req.body.primaryAddress.postalCode;
		a.primaryAddress.city = req.body.primaryAddress.city;
    	a.primaryAddress.country = req.body.primaryAddress.country;

        a.save(function(err, a){
	        if(err) return res.status(500).send('Error occurred: database error.');
	        res.json({ id: a._id });
    	});
    });
});

/*
Deletes an user. Takes an user ID. 
The user is not removed from the database, his status is changed to inactive.
*/
app.delete('/api/user/:id', function(req,res){
    User.findById(req.params.id, function(err, a){
        if(err) return res.status(500).send('Error occurred: database error.');

		a.isActive = false;

        a.save(function(err, a){
	        if(err) return res.status(500).send('Error occurred: database error.');
	        res.json({ id: a._id });
    	});
    });

});

app.listen(app.get('port'), function(){
    console.log( 'Express started in ' + app.get('env') +
        ' mode on http://localhost:' + app.get('port') +
        '; press Ctrl-C to terminate.' );
});