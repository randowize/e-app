import {inject, observer} from 'mobx-react';

export const propsSelectionFromStore = storeName => part => (...propsNames) => component => {
    return inject(stores => {
        const store = stores[storeName][part] || stores[storeName];
        if (propsNames.length <= 0 && part) return {[part]: store};
        return propsNames.reduce((prev, prop) => {
            let propsToMapTo: any[];
            let key;
            if (Array.isArray(prop)) {return prev; };
            if (typeof prop === 'object') {
                key = Object.keys(prop)[0];
                propsToMapTo = prop[key];
                if ( !Array.isArray(propsToMapTo)) {
                  propsToMapTo = [propsToMapTo];
                }
            }else {
                key = prop;
                propsToMapTo = [prop];
            }
            const obj = propsToMapTo.reduce((acc, curr) => {
                            acc[curr] = store[key];
                            return acc;
                        }, {});
            return Object.assign({}, prev, obj);
        }, {});
    })(observer(component));
};

export const selectProps = propsSelectionFromStore('store');