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

        //console.log('updateStores: '+sku+" "+postCode);
        var component = this;

        var onError = function (error) {
            //console.log('onError called');
            component.set('stores', false);
            component.set('selectedSize', false);
            component.update('selectedSize');
            component.update('stores');
        };

        var onSuccess = function (successResult) {
            //console.log('onSuccess called');

            if (successResult.status === 'error') {
                onError(successResult);
            } else {
                component.set('stores', successResult.stores);
                component.update('stores');
            }
        };

        // reset stores (to show loading...)
        this.set('stores', false);
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

        this.on('toggleActiveStore', function (event, name) {
            // assumes names are unique
            var namedStoreIndex = false;
            var namedStore = this.get('stores').filter( function(store, i){
                if (store.name === name) {
                    namedStoreIndex = i;
                    return true;
                }
                return false;
            })[0];

            if (namedStoreIndex) {
                // toggle active on that store.
                this.set('stores.' + namedStoreIndex + '.active', !namedStore.active);
            }
        });
    }
});

module.exports = MarkupModalUIComponent;
