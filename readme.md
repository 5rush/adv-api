# Test

The assignment is to build an API in node. The purpose is to store and retrieve users. You should be able to create, update, read and delete user. The code should also be tested.

__Properties of a user:__
* id
* email
* first name
* last name
* nationality
* phone number
* primary address
	* delivery address
	* postal code
	* city
	* country

You are of course free to add any properties you want to the above. Also, when a user is deleted it should merely not show when trying to retrieve the user, the data should still be left intact in the database.



# RESTful API


__GET */api/users*__
	Returns a list of users.

__GET */api/user/:id*__
	Returns an user by ID

__POST */api/user*__
	Takes email, first name, last name, nationality, phone number, primary address(delivery address, postal code, city,	country) in the request body.

__PUT */api/user/:id*__
	Updates an existing user. Takes an user ID, email, first name, last name, nationality, phone number, primary address(delivery address, postal code, city, country) in the request body.

__DELETE */api/user/:id*__
	Deletes an user. Takes an user ID. The user is not removed from the database, his status is changed into inactive.

# Running the app locally
Clone the repository by using the following web URL:
https://github.com/5rush/adv-api.git
Install dependencies: `npm install`
Run the app with the following command: `nodejs adv-api.js`
For easier testing import Postman collection from the following link: https://www.getpostman.com/collections/a0ede19f3434c0e83a7f

# Running tests locally
All tests are in /qa/test-api.js and they can be run with the command:
`mocha -u tdd -R spec qa/tests-api.js`

# Testing the live app
The app is deployed on Heroku and the following link is the app's URL: https://adv-api.herokuapp.com/api/users
For easier testing of live app import Postman collection from the following link: https://www.getpostman.com/collections/016c829da609551d5f1d

:fire:



