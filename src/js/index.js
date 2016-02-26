var StoreStockChecker = require('./store-stock-checker');
var MarkupModalUIComponent = require('./markup-modal-component');

module.exports = {
    getUIComponent: function() {
        return MarkupModalUIComponent;
    },
    getHelper: function() {
        return StoreStockChecker;
    }
};

// hack to get require working on the frontend for demo
window.require = require;
