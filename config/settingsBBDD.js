
/**
 * Created by ramon on 21/10/15.
 */

var settingsBBDD = {
    connections : {
        appBBDD  : {
            "dev": {
                "username": "root",
                "password": "khqtzdlw",
                "database": "test_api",
                "host": "127.0.0.1",
                "dialect": "mysql"
            },
            "replica": {
                "username": "root",
                "password": "kqhtzdlw",
                "database": "test_api",
                "host": "127.0.0.1",
                "dialect": "mysql"
            },
            "prod": {
                "username": "root",
                "password": "kqhtzdlw",
                "database": "test_api",
                "host": "127.0.0.1",
                "dialect": "mysql"
            }
        },
        mqpshBBDD : {
            "dev": {
                "username": "dmq1ex",
                "password": "81H185e1S5Sp50g",
                "database": "mqpsh_mig5",
                "host": "rds-mq1-dev.criwvzvvakn7.eu-west-1.rds.amazonaws.com",
                "port": "3306",
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


