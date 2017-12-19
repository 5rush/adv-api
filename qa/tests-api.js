var assert = require('chai').assert;
var http = require('http');
var rest = require('restler');

var base = 'http://localhost:3000';

suite('API tests', function(){

    var user = {
        email: 'john.snow@test.com',
        firstName: 'John',
        lastName: 'Snow',
        nationality: 'English',
        phoneNumber: '+432123211',
        primaryAddress: {
            deliveryAddress: 'Godswood of Winterfell',
            postalCode: '10000',
            city: 'Winter town',
            country: 'Winterfell'
        },
    };

    test('should be able to add an user', function(done){
        rest.post(base + '/api/user', { data: user }).on('success', function(data){
            assert.match(data.id, /\w/, 'id must be set');
            done();
        });
    });

    test('should be able to retrieve a list of users', function(done){
        rest.post(base + '/api/user', { data: user }).on('success', function(data){
            rest.get(base + '/api/users').on('success', function(data){
                assert.isArray(data);
                done();
            });
        });
    });

    test('should be able to retrieve an user', function(done){
        rest.post(base + '/api/user', { data: user }).on('success', function(data){
            rest.get(base + '/api/user/' + data.id).on('success', function(data){
                assert(data.firstName===user.firstName);
                assert(data.email===user.email);
                done();
            });
        });
    });

    test('should be able to update an user', function(done){
        rest.post(base + '/api/user', { data: user }).on('success', function(data){
            var updatedUser = user;
            updatedUser.email = 'dummy.email@test.com';
            rest.put(base + '/api/user/' + data.id, { data: updatedUser}).on('success', function(data){
                rest.get(base + '/api/user/' + data.id).on('success', function(data){
                    assert(data.email === 'dummy.email@test.com');
                    done();
                });
            });
        });
    });

    test('should be able to delete an user', function(done){
        rest.post(base + '/api/user', { data: user }).on('success', function(data){
            rest.del(base + '/api/user/' + data.id).on('success', function(data){
                rest.get(base + '/api/user/' + data.id).on(404, function(data, response){
                    assert(response.statusCode === 404);
                    done();
                });
            });
        });
    });
});