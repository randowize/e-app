import * as Rx from 'rxjs';
//import * as chokidar from 'chokidar';
//import * as path from 'path';
//const imgpath = path.resolve(__dirname, '../../resources/nimg.bmp');
//const watcher = chokidar.watch(imgpath);

type TextArea = HTMLTextAreaElement;

interface IEvent {
  type: string;
  [key: string]: any;
}
type EventType = 'text-change' | 'img-refresh';

const subject = new Rx.Subject<IEvent>();

const dispatch = (type: EventType) => (...data) => {
  subject.next({ data, type });
};

//watcher.on('change', path => {
 // dispatch('img-refresh')(path);
//});

export const textStream = subject
  .filter(o => o.type === 'text-change')
  .map(o => ({ type: o.type, text: o.data[0] }));

 export const refreshStream = subject
  .filter(o => o.type === 'img-refresh')
  .map(o => ({ type: o.type, src: o.data[0] }));

export const nextTextEvent = (text: string) => ({ type: 'text-change', text });

const valueStream = (node: TextArea) =>
  Rx.Observable
    .fromEvent(node, 'input')
    .debounceTime(100)
    .pluck('target')
    .pluck('value')
    .do(dispatch('text-change'));

export const refreshPreview = dispatch('img-refresh');
export default valueStream;
