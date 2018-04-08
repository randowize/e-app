import * as Rx from 'rxjs';

export type EventName =
  | 'debug'
  | 'text-change'
  | 'toggle-preview'
  | 'test'
  | 'refresh-preview'
  | 'process-img'
  | 'capture-area'
  | 'rasterized-content'
  | 'toolbar-resize'
  | 'add-park'
  | 'update-details'
  | 'editor-state-change';

export interface IEvent {
  type: EventName;
  [key: string]: any;
}

export const baseObservable = new Rx.Subject<IEvent>();

export const dispatch = (type: EventName) => (...data) => {
  baseObservable.next({ data, type });
};

export function observeResizeOfElement(e: Element) {
  const ro = new ResizeObserver(entries => {
    entries
    .filter(elt => elt.target === e)
    .map(dispatch('toolbar-resize'));
  });
  ro.observe(e);
  return baseObservable
  .filter(elt => elt.type === 'toolbar-resize')
  .map(elt => elt.data[0] as ResizeObserverEntry)
  .filter(elt => elt.target === e);
}
export const processText = dispatch('text-change');
