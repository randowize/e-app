import * as  Rx from 'rxjs';
export type  TextArea  = HTMLTextAreaElement ;
const valueStream = (node: TextArea)  =>  Rx
  .Observable
  .fromEvent(node, 'input')
  .debounceTime(100)
  .pluck('target')
  .pluck('value');

export default valueStream;