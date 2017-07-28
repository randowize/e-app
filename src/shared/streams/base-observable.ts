import * as Rx from 'rxjs';

export type EventName = 'debug'|
'text-change' | 'toggle-preview'|
'test' | 'refresh' | 'process-img'|
'add-park' | 'update-details';

export interface IEvent {
  type: EventName;
  [key: string]: any;
}

export const baseObservable = new Rx.Subject<IEvent>();

export const dispatch = (type: EventName) => (...data) => {
  baseObservable.next({ data, type });
};

export const processText = dispatch('text-change');