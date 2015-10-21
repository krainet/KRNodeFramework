/**
 * Created by ramon on 21/10/15.
 */

var settingsBBDD = {
    getBBDDSettings : function(database,environment){
        connections.forEach(function(item){
            console.log(item);
        });
    },
    connections : {
        appBBDD  : {
            "dev": {
                "username": "root",
                "password": null,
                "database": "test_api",
                "host": "127.0.0.1",
                "dialect": "mysql"
            },
            "replica": {
                "username": "root",
                "password": null,
                "database": "test_api",
                "host": "127.0.0.1",
                "dialect": "mysql"
            },
            "prod": {
                "username": "root",
                "password": null,
                "database": "test_api",
                "host": "127.0.0.1",
                "dialect": "mysql"
            }
        },
        mqpshBBDD : {
            "dev": {
                "username": "extra_user",
                "password": null,
                "database": "database_extra",
                "host": "127.0.0.1",
                "port": "3306",
                "dialect": "mysql"
            },
            "replica": {
                "username": "extra_user",
                "password": null,
                "database": "database_extra",
                "host": "127.0.0.1",
                "port": "3306",
                "dialect": "mysql"
            },
            "prod": {
                "username": "extra_user",
                "password": null,
                "database": "database_extra",
                "host": "127.0.0.1",
                "port": "3306",
                "dialect": "mysql"
            }
        }
    },
    getBBDDSettings : function(database,environment){
        if(database && this.connections[database]){
            if(environment && this.connections[database][environment]){
                return this.connections[database][environment];
            }else{
                return this.connections[database]['dev'];
            }
        }else{
            console.log('Database settings not found or database not set');
        }
    }
};
module.exports = settingsBBDD;





