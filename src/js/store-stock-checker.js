
'use strict';
var reqwest = require('reqwest');

var endpoint = false;

function init(options) {
    endpoint = options.endpoint
}

function getStores(sku, postCodeArg, onSuccess, onError) {
    var postCode = (typeof postCodeArg === 'undefined' || postCodeArg === 'false'|| postCodeArg === '') ? false : postCodeArg;

    //console.log("getStores for sku: "+sku+" and postCode: "+postCode);

    if (typeof sku === 'undefined' || typeof sku !== 'string') {
        throw new Error("getStores(): First arg (sku) must be a string.");
    }
    var requestData = {};
    if (postCode) {
        requestData.postCode = postCode;
    }

    //tests
    //var returnjson = {"stores":[{"id":"E12","name":"GANT STORE BRISTOL","phone":null,"email":"bristol@gant.com","hasClickAndCollect":0,"isOpen":1,"coordinates":{"latitude":"51.4582938","longitude":"-2.5847616999999"},"openingHours":{"days":[{"day":"monday","from":"10:00","to":"19:00"},{"day":"tuesday","from":"10:00","to":"19:00"},{"day":"wednesday","from":"10:00","to":"19:00"},{"day":"thursday","from":"10:00","to":"20:00"},{"day":"friday","from":"10:00","to":"19:00"},{"day":"saturday","from":"10:00","to":"19:00"},{"day":"sunday","from":"11:00","to":"17:00"}],"additionalOpeningHours":[""]},"address":{"addressLine1":"12, Philadelphia Street, Cabot Circus","addressLine2":"","addressLine3":"","locality":"BRISTOL","postalCode":"BS1 3BZ","country":"UNITED KINGDOM"},"deliveryAaddress":{"addressLine1":"","addressLine2":null,"addressLine3":null,"locality":"","postalCode":"","country":""},"availableCollections":["GANT"],"stock":{"articleId":"7332972630330","quantity":0}},{"id":"E10","name":"GANT STORE CAMRIDGE","phone":null,"email":"cambridge@gant.com","hasClickAndCollect":0,"isOpen":1,"coordinates":{"latitude":"52.2042","longitude":"0.12199039999996"},"openingHours":{"days":[{"day":"monday","from":"09:00","to":"18:00"},{"day":"tuesday","from":"09:00","to":"18:00"},{"day":"wednesday","from":"09:00","to":"20:00"},{"day":"thursday","from":"09:00","to":"18:00"},{"day":"friday","from":"09:00","to":"18:00"},{"day":"saturday","from":"09:00","to":"18:00"},{"day":"sunday","from":"11:00","to":"17:00"}],"additionalOpeningHours":[""]},"address":{"addressLine1":"26; Grand Arcade; St Andrew\u0027s St","addressLine2":"","addressLine3":"","locality":"CAMBRIDGE","postalCode":"CB2 3BJ","country":"UNITED KINGDOM"},"deliveryAaddress":{"addressLine1":"","addressLine2":null,"addressLine3":null,"locality":"","postalCode":"","country":""},"availableCollections":["GANT"],"stock":{"articleId":"7332972630330","quantity":4}},{"id":"E11","name":"GANT STORE WESTFIELD WHITE CITY","phone":null,"email":"westfield@gant.com","hasClickAndCollect":0,"isOpen":1,"coordinates":{"latitude":"51.5093373","longitude":"-0.22414019999997"},"openingHours":{"days":[{"day":"monday","from":"10:00","to":"22:00"},{"day":"tuesday","from":"10:00","to":"22:00"},{"day":"wednesday","from":"10:00","to":"22:00"},{"day":"thursday","from":"10:00","to":"22:00"},{"day":"friday","from":"10:00","to":"22:00"},{"day":"saturday","from":"10:00","to":"22:00"},{"day":"sunday","from":"12:00","to":"18:00"}],"additionalOpeningHours":[""]},"address":{"addressLine1":"2093 Ariel Way, Westfield","addressLine2":"","addressLine3":"","locality":"LONDON","postalCode":"W12 7GF","country":"UNITED KINGDOM"},"deliveryAaddress":{"addressLine1":"","addressLine2":null,"addressLine3":null,"locality":"","postalCode":"","country":""},"availableCollections":["GANT"],"stock":{"articleId":"7332972630330","quantity":1}},{"id":"E13","name":"GANT STORE GUILDFORD","phone":null,"email":"guildford@gant.com","hasClickAndCollect":0,"isOpen":1,"coordinates":{"latitude":"51.2358","longitude":"-0.573214"},"openingHours":{"days":[{"day":"monday","from":"09:00","to":"18:00"},{"day":"tuesday","from":"09:00","to":"18:00"},{"day":"wednesday","from":"09:00","to":"18:00"},{"day":"thursday","from":"09:00","to":"18:00"},{"day":"friday","from":"09:00","to":"18:00"},{"day":"saturday","from":"09:00","to":"18:00"},{"day":"sunday","from":"11:00","to":"17:00"}],"additionalOpeningHours":[""]},"address":{"addressLine1":"93-95 High Street","addressLine2":"","addressLine3":"","locality":"GUILDFORD","postalCode":"GU1 3DP","country":"UNITED KINGDOM"},"deliveryAaddress":{"addressLine1":"","addressLine2":null,"addressLine3":null,"locality":"","postalCode":"","country":""},"availableCollections":["GANT"],"stock":{"articleId":"7332972630330","quantity":1}}]};
    //onSuccess(returnjson);return;
    //endpoint =  'lol/wat/notendpoint/fail';

    reqwest({
        url: endpoint.replace('{sku}', sku),
        type: 'json',
        data: requestData,
        method: 'get',
        contentType: 'application/json',
        success: onSuccess,
        error: onError
    });

}

var storeStockChecker = {
    // full names
    init: init,
    render: render,
    getStores: getStores
};


module.exports = storeStockChecker;


