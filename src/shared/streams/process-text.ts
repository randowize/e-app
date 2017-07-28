import * as Rx from 'rxjs';
import { baseObservable, dispatch, EventName } from './base-observable';

type TextArea = HTMLTextAreaElement;

interface IEvent {
  type: EventName;
  [key: string]: any;
}

export const textStream = baseObservable
  .filter(o => o.type === 'text-change')
  .map(o => ({ type: o.type, text: o.data[0] }));

 export const refreshStream = baseObservable
  .filter(o => o.type === 'refresh')
  .map(o => ({ type: o.type, src: o.data[0] }));

export const nextTextEvent = (text: string) => ({ type: 'text-change', text }) as IEvent;

const valueStream = (node: TextArea) =>
  Rx.Observable
    .fromEvent(node, 'input')
    .debounceTime(100)
    .pluck('target')
    .pluck('value')
    .do(dispatch('text-change'));

export const refreshPreview = dispatch('refresh');
export default valueStream;
