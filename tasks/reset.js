var Sequelize   = require('sequelize');
var models      = require('../app/models/');
var async       = require('async');
var colors      = require('colors');
var crypto      = require('crypto');


models.sequelize.sync({force:true,omitNull:true}).then(function() {

    var user_data = [
        {username: 'krainet1', password: 'Basura1', email: 'krainet1@gmail.com',level:10},
        {username: 'krainet2', password: 'Basura2', email: 'krainet2@gmail.com',level:5},
        {username: 'krainet3', password: 'Basura3', email: 'krainet3@gmail.com',level:2},
        {username: 'krainet4', password: 'Basura4', email: 'krainet4@gmail.com',level:3},
        {username: 'krainet5', password: 'Basura5', email: 'krainet5@gmail.com',level:4},
        {username: 'krainet6', password: 'Basura6', email: 'krainet6@gmail.com',level:10},
        {username: 'krainet7', password: 'Basura7', email: 'krainet7@gmail.com',level:5},
        {username: 'krainet8', password: 'Basura8', email: 'krainet8@gmail.com',level:2},
        {username: 'krainet9', password: 'Basura9', email: 'krainet9@gmail.com',level:3},
        {username: 'krainet10', password: 'Basura10', email: 'krainet10@gmail.com',level:8}
    ];

    var customer_data = [
        {email: 'krainet@gmail.com', id_customer: 1},
        {email: 'krainet2@gmail.com', id_customer: 2},
        {email: 'krainet3@gmail.com', id_customer: 3},
        {email: 'krainet4@gmail.com', id_customer: 4},
        {email: 'krainet5@gmail.com', id_customer: 5},
        {email: 'krainet6@gmail.com', id_customer: 6},
        {email: 'mmateu@mequedouno.com', id_customer: 7},
        {email: 'malcoceba@mequedouno.com', id_customer: 8},
        {email: 'krainet9@gmail.com', id_customer: 9},
        {email: 'krainet10@gmail.com', id_customer: 10}
    ];


    var devicetoken_data = [
        {token: 'cGigjoJotfo:APA91bHxdwY9CFp70DXeY8nB6ar65rFLRdfTUpR6Y5AF2RqrWlF8oUZZU8vuQ2Wuqwkbu79FhW2TNL8hh_VMCUcdvIFvTC5okjJ-50Y_veRahQdjsVT_WmK_G_YSfS5GAIKyOFp9Le7b',PlatformId:1,CustomerId:1},
        {token: 'cGigjoJotfo:APA91bHxdwY9CFp70DXeY8nB6ar65rFLRdfTUpR6Y5AF2RqrWlF8oUZZU8vuQ2Wuqwkbu79FhW2TNL8hh_VMCUcdvIFvTC5okjJ-50Y_veRahQdjsVT_WmK_G_YSfS5GAIKyOFp9Le7b',PlatformId:1,CustomerId:1},
        {token: 'cGigjoJotfo:APA91bHxdwY9CFp70DXeY8nB6ar65rFLRdfTUpR6Y5AF2RqrWlF8oUZZU8vuQ2Wuqwkbu79FhW2TNL8hh_VMCUcdvIFvTC5okjJ-50Y_veRahQdjsVT_WmK_G_YSfS5GAIKyOFp9Le7b',PlatformId:2,CustomerId:3},
        {token: 'cGigjoJotfo:APA91bHxdwY9CFp70DXeY8nB6ar65rFLRdfTUpR6Y5AF2RqrWlF8oUZZU8vuQ2Wuqwkbu79FhW2TNL8hh_VMCUcdvIFvTC5okjJ-50Y_veRahQdjsVT_WmK_G_YSfS5GAIKyOFp9Le7b',PlatformId:2,CustomerId:4},
        {token: 'cGigjoJotfo:APA91bHxdwY9CFp70DXeY8nB6ar65rFLRdfTUpR6Y5AF2RqrWlF8oUZZU8vuQ2Wuqwkbu79FhW2TNL8hh_VMCUcdvIFvTC5okjJ-50Y_veRahQdjsVT_WmK_G_YSfS5GAIKyOFp9Le7b',PlatformId:1,CustomerId:5},
        {token: 'cGigjoJotfo:APA91bHxdwY9CFp70DXeY8nB6ar65rFLRdfTUpR6Y5AF2RqrWlF8oUZZU8vuQ2Wuqwkbu79FhW2TNL8hh_VMCUcdvIFvTC5okjJ-50Y_veRahQdjsVT_WmK_G_YSfS5GAIKyOFp9Le7b',PlatformId:2,CustomerId:6},
        {token: 'faPa98qZF2M:APA91bFHyyVFz_rAw964hh4QjVcQUEmBHvFCrcu5k1-HjA1X_jV92RZCcwz5Oi7FiAjH8np65MgnuAG0t3kg-FC1Ji_bPFKOe3kQdSiSIfeWp8g8E2TRzoGff-Gnp1kWvLcW4NItawNa',PlatformId:1,CustomerId:7},
        {token: 'd5IRO3tZNhI:APA91bG4qhINWnOF3MsBdMZgTObi6vi8KLPb8d-7kdq9F8xAWSq54Zjmm6re45_-klcXX--01X19DD39mtV1MR2FBYi0pubfs4bmMwxAoa9_cObey7OTPkkQ30Qj7x2a0R1HiI3ZoIeu',PlatformId:1,CustomerId:8},
        {token: 'cGigjoJotfo:APA91bHxdwY9CFp70DXeY8nB6ar65rFLRdfTUpR6Y5AF2RqrWlF8oUZZU8vuQ2Wuqwkbu79FhW2TNL8hh_VMCUcdvIFvTC5okjJ-50Y_veRahQdjsVT_WmK_G_YSfS5GAIKyOFp9Le7b',PlatformId:1,CustomerId:9},
        {token: 'cGigjoJotfo:APA91bHxdwY9CFp70DXeY8nB6ar65rFLRdfTUpR6Y5AF2RqrWlF8oUZZU8vuQ2Wuqwkbu79FhW2TNL8hh_VMCUcdvIFvTC5okjJ-50Y_veRahQdjsVT_WmK_G_YSfS5GAIKyOFp9Le7b',PlatformId:2,CustomerId:10}
    ];

    var segment1 = {id_customer: {'<': 1}},segment2 = {id_customer: {'<': 2}},segment3 = {id_customer: {'<': 3}};
    var segment_data = [
        {name: 'Test segment 1', description: 'Segmento de pruebas n.1', configuration: JSON.stringify(segment1)},
        {name: 'Test segment 2', description: 'Segmento de pruebas n.2', configuration: JSON.stringify(segment2)},
        {name: 'Test segment 3', description: 'Segmento de pruebas n.3', configuration: JSON.stringify(segment3)},
        {name: 'Test segment 4', description: 'Segmento de pruebas n.4', configuration: JSON.stringify(segment1)},
        {name: 'Test segment 5', description: 'Segmento de pruebas n.5', configuration: JSON.stringify(segment2)},
        {name: 'Test segment 6', description: 'Segmento de pruebas n.6', configuration: JSON.stringify(segment3)},
        {name: 'Test segment 7', description: 'Segmento de pruebas n.7', configuration: JSON.stringify(segment1)},
        {name: 'Test segment 8', description: 'Segmento de pruebas n.8', configuration: JSON.stringify(segment2)},
        {name: 'Test segment 9', description: 'Segmento de pruebas n.9', configuration: JSON.stringify(segment3)},
        {name: 'Test segment 10', description: 'Segmento de pruebas n.10', configuration: JSON.stringify(segment3)},
    ];

    var scheduller_data = [
        {
            name: 'Campaña 1',
            message: 'Compra en MeQuedoUno cupon SOLOAPP',
            is_draft: true,
            processed: false,
            date_send: new Date(),
            SegmentId: 1
        },
        {
            name: 'Campaña 2',
            message: 'Compra en MeQuedoUno cupon SOLOAPP2',
            is_draft: false,
            processed: true,
            date_send: new Date(),
            SegmentId: 2
        },
        {
            name: 'Campaña 3',
            message: 'Ahora en MeQuedoUno cupon SOLOAPP',
            is_draft: true,
            processed: false,
            date_send: new Date(),
            SegmentId: 1
        },
        {
            name: 'Campaña 4',
            message: 'Solo en MeQuedoUno cupon SOLOAPP2',
            is_draft: false,
            processed: true,
            date_send: new Date(),
            SegmentId: 2
        },
        {
            name: 'Campaña 5',
            message: 'Cuando en MeQuedoUno cupon SOLOAPP',
            is_draft: 1,
            processed: 0,
            date_send: new Date(),
            SegmentId: 1
        },
        {
            name: 'Campaña 6',
            message: 'Yeppa en MeQuedoUno cupon SOLOAPP2',
            is_draft: 0,
            processed: 1,
            date_send: new Date(),
            SegmentId: 2
        }
    ];

    var platforms_data = [
        {name: 'iOS', active: true},
        {name: 'Android', active: true},
        {name: 'WPhone', active: false}
    ];

    var nshops_data = [
        {shop_name:"mqu",value:JSON.stringify({color: "#e78808", name:"Tech",link: "http://tech.mequedouno.com",logo:"http://str.yeeday.net/img/cm/es/mqu/logo-mqu.png"})},
        {shop_name:"mqv",value:JSON.stringify({color: "#8C003a", name: "Vino",link: "http://vino.mequedouno.com",logo: "http://str.yeeday.net/img/cm/es/mqv/logo-mqv.png"})},
        {shop_name:"mqh",value:JSON.stringify({color: "#603619", name: "Hogar", link: "http://hogar.mequedouno.com", logo: "http://str.yeeday.net/img/cm/es/mqh/logo-mqh.png"})},
        {shop_name:"mqk",value:JSON.stringify({color: "#f21B19", name: "Kids", link: "http://kids.mequedouno.com", logo: "http://str.yeeday.net/img/cm/es/mqk/logmqk.png"})},
        {shop_name:"mqc",value:JSON.stringify({color: "#6a3792", name: "Chic", link: "http://chic.mequedouno.com", logo: "http://str.yeeday.net/img/cm/es/mqc/logochic.png"})},
        {shop_name:"mqd",value:JSON.stringify({color: "#167daE", name: "Deporte", link: "http://deporte.mequedouno.com", logo: "http://str.yeeday.net/img/cm/es/mqd/logodepord.png"})},
        {shop_name:"mqs",value:JSON.stringify({color: "#009343", name: "Super", link: "http://super.mequedouno.com", logo: "http://str.yeeday.net/img/cm/es/mqs/logo-mqs_nl.png"})}
    ];
    
    var ncomponents_data = [
        {name: "Header", type: "header1", tconstructor: "",  template: "newsletterMaker/templates/Header1.tpl.html", values: JSON.stringify({})},
        {name: "Disclaimer", type: "disclaimer1", tconstructor: "", template: "newsletterMaker/templates/Disclaimer1.tpl.html", values: JSON.stringify({})},
        {name: "Footer", type: "footer1", tconstructor: "", template: "newsletterMaker/templates/Footer1.tpl.html", values: JSON.stringify({})},
        {name: "Image 580", type: "image580", tconstructor: "", template: "", values: JSON.stringify({link:"http://str.yeeday.net/img/cm/es/mqu/no_image.png"})},
        {name: "Image 270", type: "image270", tconstructor: "", template: "", values: JSON.stringify({link:"http://str.yeeday.net/img/cm/es/mqu/no_image.png"})},
        {name: "Simple Text", type: "simpleText", tconstructor: "", template: "newsletterMaker/templates/simpleText.tpl.html", values: JSON.stringify({})},
        {name: "Html", type: "freeHtml", tconstructor: "", template: "", values: JSON.stringify({html:'<table width="580" border="0" cellpadding="0" cellspacing="0" style="text-align: center;"><tbody><tr><td style="color: rgb(82, 79, 79);text-align: left;"><h1>Bienvenido al CLUB VIP</h1></td></tr></tbody></table><table width="100%" border="0" cellpadding="0" cellspacing="0" style="color: rgb(34, 34, 34);background-color: rgb(255, 255, 255);text-align: center;"><tbody><tr><td width="100%"> <table width="580" border="0" cellpadding="0" cellspacing="0" style="text-align: center;"><tbody><tr><td style="color: rgb(107, 107, 107);text-align: left;"><a href="http://hogar.mequedouno.com" target="_blank" style="color: rgb(248, 135, 0);"><strong>Tienes Envío Gratis hasta final de año</strong></a><br>Hola, eres un cliente VIP en MeQuedoUno. Y nos apetece compartirlo contigo. En algún momento de nuestra breve pero intensa historia has estado ahí, dándolo todo y disfrutando de las oportunidades más tentadoras, por eso, ahora que se acerca nuestro Sexto Aniversario<strong> ¡queremos celebrarlo contigo!</strong></td></tr></tbody></table></td></tr></tbody></table>'})},
        {name: "Crosseling", type: "crosseling", tconstructor: "", template: "newsletterMaker/templates/Crosseling1.tpl.html", values: JSON.stringify({})},
        {name: "MOButton", type: "verMejoresB", tconstructor: "", template: "newsletterMaker/templates/VerMejoresB.tpl.html", values: JSON.stringify({})},
        {name: "¿Eres fan?", type: "fan", tconstructor: "", template: "newsletterMaker/templates/Fan.tpl.html", values: JSON.stringify({})},
        {name: "Barra", type: "bar", tconstructor: "", template: "newsletterMaker/templates/Bar.tpl.html", values: JSON.stringify({})},
        {name: "Apps", type: "apps", tconstructor: "", template: "newsletterMaker/templates/Apps.tpl.html", values: JSON.stringify({})},
        {name: "Contenedor", tconstructor: "", template: "", type: "container", values: JSON.stringify({columns: [[], []]})},
        {name: "Contenedor 3", tconstructor: "", template: "",type: "container3", values: JSON.stringify({columns: [[],[],[]]})}
    ];


    async.waterfall([
        function(next){
            models.Nshop.bulkCreate(nshops_data)
                .then(function(result){
                    next();
                });
        },
        function(next){
            models.Ncomponent.bulkCreate(ncomponents_data)
                .then(function(result){
                    next();
                });
        },
        function (next) {
            models.Platform.bulkCreate(platforms_data)
                .then(function () {
                    next();
                }
            );
        },
        function (next) {
            models.Customer.bulkCreate(customer_data)
                .then(function () {
                    next();
                }
            );
        },
        function (next) {
            models.Segment.bulkCreate(segment_data)
                .then(function () {
                    next();
                }
            );
        },
        function (next) {
            models.Devicetoken.bulkCreate(devicetoken_data)
                .then(function (insertedObjects) {
                    models.Segment.findByPrimary(1)
                        .then(function(segment){
                            segment.addDevicetoken([1,2,3,4,5]);
                            next();
                        });

                });
        },
        function(next){
            models.Segment.findByPrimary(2)
                .then(function(segment){
                    segment.addDevicetokens([3,4]);
                    next();
                });
        },
        function (next) {
            models.Scheduller.bulkCreate(scheduller_data)
                .then(function (result) {
                    models.Segment.findByPrimary(1)
                        .then(function(segment){
                            segment.addScheduller([1]);
                            models.Segment.findByPrimary(1)
                                .then(function(segment2){
                                    segment2.addScheduller([2,1]).then(function(){next()});
                                });
                        });


                }
            );
        },
        function(next){
            models.Scheduller.bulkCreate(user_data)
                .then(function(result){
                    next();
                });
        }
    ], function (err, result) {
        if (err) {
            console.log('ERROR'.red);
            return err;
        } else {
            console.log('All inserted OK'.yellow);
            return result;
        }
    });

});