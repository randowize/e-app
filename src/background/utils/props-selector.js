"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_react_1 = require("mobx-react");
exports.propsSelectionFromStore = storeName => part => (...propsNames) => component => {
    return mobx_react_1.inject(stores => {
        const store = stores[storeName][part] || stores[storeName];
        return propsNames.reduce((prev, prop) => {
            let propsToMapTo;
            let key;
            if (Array.isArray(prop)) {
                return prev;
            }
            ;
            if (typeof prop === 'object') {
                key = Object.keys(prop)[0];
                propsToMapTo = prop[key];
                if (!Array.isArray(propsToMapTo)) {
                    propsToMapTo = [propsToMapTo];
                }
            }
            else {
                key = prop;
                propsToMapTo = [prop];
            }
            const obj = propsToMapTo.reduce((acc, curr) => {
                acc[curr] = store[key];
                return acc;
            }, {});
            return Object.assign({}, prev, obj);
        }, {});
    })(mobx_react_1.observer(component));
};
exports.selectProps = exports.propsSelectionFromStore('store');
