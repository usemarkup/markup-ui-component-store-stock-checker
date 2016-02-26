var fs = require('fs');
var path = require('path');
var Ractive = require('ractive');
var StoreStockChecker = require('./store-stock-checker');
var keys = require('ractive-events-keys');

var template = fs.readFileSync(path.join(__dirname, '../templates/markup-modal-default.mustache'), 'utf8');

Ractive.events.enter = keys.enter;

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
        console.log('update stores called with '+sku+' + '+ postCode);
        var _this = this;
        var onError = function (error) {
            console.log('error ', error);
            _this.set('stores', false);
            _this.set('selectedSize', false);
            _this.update('selectedSize');
            _this.update('stores');
        };

        var onSuccess = function (successResult) {
            if (successResult.status === 'error') {
                onError(successResult);
            } else {
                console.log('success', successResult);
                _this.set('stores', successResult.stores);
                _this.update('stores');
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

        this.on('updateStores', function (event, sku, postCode) {
            console.log('updateStoresEvent',event, sku, postCode);
            this.updateStores(sku, postCode);
        });
        this.on('toggleActiveStore', function (event, index) {
            var store = this.get('stores')[index];
            if (store.active) {
                this.set('stores.' + index + '.active', false);
            } else {
                this.set('stores.' + index + '.active', true);
            }
        });
    }
});

module.exports = MarkupModalUIComponent;
