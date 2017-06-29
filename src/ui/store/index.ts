import {observable, computed, action} from 'mobx';
import * as Rx from 'rxjs';
import {delay} from '../../utils/timers';
import MenuStore from './menu';
import LedStore from './led-editor';

class Store {
    //body
    menuStore = new MenuStore();
    ledStore = new LedStore();
 /*
    @observable text = '';

    @computed get value() {
        return this
            .text
            .toUpperCase();
    }

   @action setText = async(text : string) => {
        this.text = 'waiting...';
        await delay(1000);
        this.text = '';
        Rx.Observable.from(text.split(''))
        .concatMap((c) => Rx.Observable.of(c).delay(20))
        .do( c => this.text += c)
        .subscribe(f => f);
    }
    */
}

export default Store;
