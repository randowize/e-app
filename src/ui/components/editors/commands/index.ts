import * as Rx from 'rxjs';
import { IStateGetter, IStateCommitter, IAction } from './interfaces';

export const registerActionsShortcuts = (elt: HTMLDivElement) => (
  g: IStateGetter,
  t: IStateCommitter
) => {
  const subscriptions = new Map();
  return (key: string, action: IAction, desc?: string) => {
    const subscription =  Rx.Observable.fromEvent<KeyboardEvent>(elt, 'keyup')
      .do(e => e.stopPropagation())
      .filter(
        e => e.altKey && e.ctrlKey && e.code === `Key${key.toUpperCase()}`
      )
      .subscribe(e => action(g, t));
      subscriptions.set(key, () => subscription.unsubscribe());
      return () => {
       subscriptions.get(key)();
       subscriptions.delete(key);
      };
  };
};
