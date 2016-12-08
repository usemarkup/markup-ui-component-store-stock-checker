var fs = require('fs');
var path = require('path');
var Ractive = require('ractive');
var StoreStockChecker = require('./store-stock-checker');
var keys = require('ractive-events-keys');

var template = fs.readFileSync(path.join(__dirname, '../templates/markup-modal-default.mustache'), 'utf8');

Ractive.events.enter = keys.enter;
Ractive.DEBUG = false;

var MarkupModalUIComponent = Ractive.extend({
    template: template,
    data: {
        show: false,
        selectedSize: false
    },
    events: {
        enter: keys.enter
    },
    // method to show the modal
    show: function () {
        this.set('show', true);
    },
    hide: function () {
        this.set('show', false);
    },
    updateStores: function (sku, postCode) {

        var component = this;

        var onError = function (xmlHttpRequestObject) {
            var response;
            try {
                response = JSON.parse(xmlHttpRequestObject.response);
            }
            catch(err) {
                // bad response still gets default error handling in switch.
                response = {};
            }
            switch (response.errorType) {
                case 'location':
                    // location error, location specific error
                    component.set('errorTypeLocation', true);
                    // unset postcode
                    component.set('postCode', '');
                    break;
                case 'badRequest':
                    // Unavailable at any stores
                    component.set('errorTypeUnavailable', true);
                    break;
                case 'passThrough':
                case 'general':
                default:
                    // none of the above, generic error message
                    component.set('errorTypeGeneral', true);
            }
        };

        // successful/200 responses always return stores. anything else goes to onError
        var onSuccess = function (response) {
            component.set('stores', response.stores);
        };

        // reset stores (to show loading...)
        this.set('stores', false);

        // reset errors
        component.set('errorTypeGeneral', false);
        component.set('errorTypeLocation',false);

        StoreStockChecker.getStores(sku, postCode, onSuccess, onError);
    },
    // initialisation code
    oninit: function () {
        // event binding, not sure if this should happen here or in client code...
        this.on('close', function (event) {
            // stop this event bubbling
            if (event.original.target !== event.node){
                return; // do nothing.
            }
            this.hide();
        });

        this.on('postCodeSubmit', function (event, sku, postCode) {
            // don't submit an empty postcode
            if (postCode === "") {
                return;
            }
            this.updateStores(sku, postCode);
        });

        this.on('toggleActiveStore', function (event) {
            event.context.active = !event.context.active;
            this.update();
        });
    }
});

module.exports = MarkupModalUIComponent;
