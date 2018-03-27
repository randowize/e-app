import * as Rx from 'rxjs';

export function registerEditorKeyboardBindings(elt: HTMLDivElement) {
  return (key: string, action) => {
    return Rx.Observable.fromEvent<KeyboardEvent>(elt, 'keyup')
      .filter(e => e.ctrlKey && e.code === `Key${key.toUpperCase()}`)
      .subscribe(action);
  };
}
