/**
 * Created by ramon on 25/09/15.
 */
/*
{name: "Header", type: "header1", id: 1, template: 'newsletterMaker/templates/Header1.tpl.html' },
{name: "Disclaimer", type: "disclaimer1", id: 1, template: 'newsletterMaker/templates/Disclaimer1.tpl.html'},
{name: "Footer", type: "footer1", id: 1, template: 'newsletterMaker/templates/Footer1.tpl.html'},
{name: "Image 580", type: "image580", id: 1, template: '',link:'http://str.yeeday.net/img/cm/es/mqu/no_image.png'},
{name: "Image 270", type: "image270", id: 1, template: '', link:'http://str.yeeday.net/img/cm/es/mqu/no_image.png'},
{name: "Simple Text", type: "simpleText", id: 1, template: 'newsletterMaker/templates/simpleText.tpl.html'},
{name: "Html", type: "freeHtml", id: 1, template: '', html:'<table width="580" border="0" cellpadding="0" cellspacing="0" style="text-align: center;"><tbody><tr><td style="color: rgb(82, 79, 79);text-align: left;"><h1>Bienvenido al CLUB VIP</h1></td></tr></tbody></table><table width="100%" border="0" cellpadding="0" cellspacing="0" style="color: rgb(34, 34, 34);background-color: rgb(255, 255, 255);text-align: center;"><tbody><tr><td width="100%"> <table width="580" border="0" cellpadding="0" cellspacing="0" style="text-align: center;"><tbody><tr><td style="color: rgb(107, 107, 107);text-align: left;"><a href="http://hogar.mequedouno.com" target="_blank" style="color: rgb(248, 135, 0);"><strong>Tienes Envío Gratis hasta final de año</strong></a><br>Hola, eres un cliente VIP en MeQuedoUno. Y nos apetece compartirlo contigo. En algún momento de nuestra breve pero intensa historia has estado ahí, dándolo todo y disfrutando de las oportunidades más tentadoras, por eso, ahora que se acerca nuestro Sexto Aniversario<strong> ¡queremos celebrarlo contigo!</strong></td></tr></tbody></table></td></tr></tbody></table>'},
{name: "Crosseling", type: "crosseling", template: 'newsletterMaker/templates/Crosseling1.tpl.html', id: 1},
{name: "MOButton", type: "verMejoresB", template: 'newsletterMaker/templates/VerMejoresB.tpl.html',id: 1},
{name: "¿Eres fan?", type: "fan", template: 'newsletterMaker/templates/Fan.tpl.html',id: 1},
{name: "Barra", type: "bar", template: 'newsletterMaker/templates/Bar.tpl.html',id: 1},
{name: "Apps", type: "apps", template: 'newsletterMaker/templates/Apps.tpl.html',id: 1},
{name: "Contenedor", type: "container", id: 1, columns: [[], []]},
{name: "Contenedor 3", type: "container3", id: 1, columns: [[],[],[]]}*/

"use strict";


module.exports = function(sequelize, DataTypes) {
    var Ncomponent = sequelize.define("Ncomponent", {
        name         : DataTypes.STRING,
        type         : DataTypes.STRING,
        tconstructor : DataTypes.TEXT,
        template     : DataTypes.TEXT,
        values       : DataTypes.TEXT,
        deleted     : {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false}
    },{
        classMethods : {
            associate : function(models){

            }
        }
    });
    return Ncomponent;
};