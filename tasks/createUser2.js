var models      = require('../app/models/');
var async       = require('async');
var crypto      = require('crypto');

/*
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});
*/

if (process.argv.length != 6) {
    console.log('You need 4 parameters to create an user. Username, Password, email and level');
}
else {
    var username = process.argv[2];
    var password = crypto.createHash('md5').update(process.argv[3]).digest("hex");
    var email = process.argv[4];
    var level = process.argv[5];
    models.User.create({username: username, password: password, email: email, level: level })
        .then(function(result){
            console.log ("New user " + result.username);
            console.log ("Password " + result.password);
            console.log ("Email " + result.email);
            console.log ("level " + result.level);
        });
}

